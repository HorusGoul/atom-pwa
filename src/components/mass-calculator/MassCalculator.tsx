import autobind from "autobind-decorator";
import * as classNames from "classnames";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IElement } from "../../Element";
import ElementManager from "../../ElementManager";
import ElementPicker from "../element-picker/ElementPicker";
import Button from "../shared/button/Button";
import IconButton from "../shared/icon-button/IconButton";
import ListItemSwipeAction from "../shared/list-item-swipe-action/ListItemSwipeAction";
import Modal from "../shared/modal/Modal";
import Navbar from "../shared/navbar/Navbar";
import "./MassCalculator.scss";

interface IMassCalculatorElement {
  atomic: number;
  quantity: number;
}

type Props = RouteComponentProps<any> & React.Props<any>;

interface IMassCalculatorState {
  elements: IMassCalculatorElement[];
  addElementModalOpen: boolean;
  modifyElementModal: {
    open: boolean;
    elementIndex: number;
  };
}

@autobind
class MassCalculator extends React.Component<Props, IMassCalculatorState> {
  public state: IMassCalculatorState = {
    addElementModalOpen: false,
    elements: [
      { atomic: 67, quantity: 1 },
      { atomic: 44, quantity: 1 },
      { atomic: 16, quantity: 1 }
    ],
    modifyElementModal: {
      elementIndex: 0,
      open: true
    }
  };

  public render() {
    const { elements, addElementModalOpen, modifyElementModal } = this.state;

    return (
      <div className="mass-calculator">
        <Navbar
          title="Mass Calculator"
          backButton={true}
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        <div className="mass-calculator__result-bar">
          <span className="mass-calculator__result-bar__text">Total</span>

          <span className="mass-calculator__result-bar__value">
            {this.calculateTotalValue()} g / mol
          </span>
        </div>

        <div className="mass-calculator__controls">
          <IconButton
            onClick={this.openAddElementModal}
            iconName="add_circle"
            text="Add Element"
          />

          <IconButton
            onClick={this.clearElements}
            iconName="clear_all"
            text="Clear"
          />
        </div>

        <div className="mass-calculator__element-list">
          {elements.map(element => (
            <ListItemSwipeAction
              key={element.atomic}
              className="mass-calculator__swipe-item"
              frontContent={this.massCalculatorElement(element)}
              onAction={this.onActionBuildListener(element.atomic)}
            />
          ))}
        </div>

        <Modal
          className="mass-calculator__add-element-modal"
          open={addElementModalOpen}
          onClose={this.onCloseAddElementModal}
        >
          <ElementPicker onElement={this.elementPickerOnElement} />
        </Modal>

        <Modal
          className="mass-calculator__modify-element-modal"
          open={modifyElementModal.open}
          onClose={this.onCloseModifyElementModal}
        >
          {this.buildModifyElementModal()}
        </Modal>
      </div>
    );
  }

  private buildModifyElementModal() {
    const { modifyElementModal, elements } = this.state;
    const index = modifyElementModal.elementIndex;
    const massCalculatorElement = elements[index];

    if (!massCalculatorElement) {
      return null;
    }

    const element = ElementManager.getElement(massCalculatorElement.atomic);

    return (
      <React.Fragment>
        <Navbar
          title={element.name}
          backButton={true}
          onBackButtonClick={this.onCloseAddElementModal}
        />
      </React.Fragment>
    );
  }

  private openModifyElementModal(element: IMassCalculatorElement) {
    const elementIndex = this.state.elements.indexOf(element);

    this.setState({
      modifyElementModal: {
        elementIndex,
        open: true
      }
    });
  }

  private onCloseModifyElementModal() {
    const { modifyElementModal } = this.state;

    this.setState({
      modifyElementModal: {
        ...modifyElementModal,
        open: false
      }
    });
  }

  private elementPickerOnElement(element: IElement) {
    this.addElement(element.atomic);

    this.setState({
      addElementModalOpen: false
    });
  }

  private addElement(atomic: number) {
    const { elements } = this.state;
    const currentElement = elements.find(element => element.atomic === atomic);

    if (currentElement) {
      return this.modifyQuantity(atomic, currentElement.quantity + 1);
    }

    this.setState({
      elements: [...elements, { atomic, quantity: 1 }]
    });
  }

  private modifyQuantity(atomic: number, quantity: number) {
    const { elements } = this.state;

    const newElements = [...elements]
      .map(element => {
        if (element.atomic === atomic) {
          return { ...element, quantity };
        }

        return element;
      })
      .filter(element => element.quantity > 0);

    this.setState({
      elements: newElements
    });
  }

  private openAddElementModal() {
    this.setState({
      addElementModalOpen: true
    });
  }

  private onCloseAddElementModal() {
    this.setState({
      addElementModalOpen: false
    });
  }

  private clearElements() {
    this.setState({
      elements: []
    });
  }

  private onActionBuildListener(atomic: number) {
    return () => this.onListItemSwipeAction(atomic);
  }

  private onListItemSwipeAction(atomic: number) {
    this.removeElement(atomic);
  }

  private removeElement(atomic: number) {
    const { elements } = this.state;

    this.setState({
      elements: elements.filter(element => element.atomic !== atomic)
    });
  }

  private onMassCalculatorElementClick(element: IMassCalculatorElement) {
    return () => this.openModifyElementModal(element);
  }

  private massCalculatorElement(massCalculatorElement: IMassCalculatorElement) {
    const { atomic, quantity } = massCalculatorElement;
    const element = ElementManager.getElement(atomic);

    return (
      <Button
        onClick={this.onMassCalculatorElementClick(massCalculatorElement)}
        className="mass-calculator__element"
      >
        <div
          className={classNames(
            "mass-calculator__element__symbol",
            "element",
            element.group
          )}
        >
          {element.symbol}
        </div>

        <div className="mass-calculator__element__desc">
          <span className="mass-calculator__element__name">{element.name}</span>

          <span className="mass-calculator__element__group">
            {element.atomicMass} g / mol
          </span>
        </div>

        <div className="mass-calculator__element__quantity">
          <span className="mass-calculator__element__quantity__text">
            AMOUNT
          </span>

          <span className="mass-calculator__element__quantity__number">
            {quantity}
          </span>
        </div>
      </Button>
    );
  }

  private calculateTotalValue() {
    const { elements } = this.state;

    let totalValue = 0;

    if (elements.length) {
      totalValue = this.state.elements
        .map(
          element =>
            Number(ElementManager.getElement(element.atomic).atomicMass) *
            element.quantity
        )
        .reduce((previous, current) => previous + current);
    }

    return totalValue;
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }
}

export default withRouter<Props>(MassCalculator);
