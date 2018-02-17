import autobind from "autobind-decorator";
import * as classNames from "classnames";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IElement } from "../../Element";
import ElementManager from "../../ElementManager";
import Button from "../shared/button/Button";
import ListItemSwipeAction from "../shared/list-item-swipe-action/ListItemSwipeAction";
import Navbar from "../shared/navbar/Navbar";
import "./MassCalculator.scss";

interface IMassCalculatorElement {
  atomic: number;
  quantity: number;
}

type Props = RouteComponentProps<any> & React.Props<any>;

interface IMassCalculatorState {
  elements: IMassCalculatorElement[];
}

@autobind
class MassCalculator extends React.Component<Props, IMassCalculatorState> {
  public state: IMassCalculatorState = {
    elements: [
      { atomic: 1, quantity: 1 },
      { atomic: 2, quantity: 1 },
      { atomic: 3, quantity: 1 }
    ]
  };

  public render() {
    const { elements } = this.state;

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

        <div className="mass-calculator__element-list">
          {elements.map(element => (
            <ListItemSwipeAction
              key={element.atomic}
              className="mass-calculator__swipe-item"
              frontContent={this.massCalculatorElement(
                element.atomic,
                element.quantity
              )}
              onAction={this.onActionBuildListener(element.atomic)}
            />
          ))}
        </div>
      </div>
    );
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

  private massCalculatorElement(atomic: number, quantity: number) {
    const element = ElementManager.getElement(atomic);

    return (
      <Button className="mass-calculator__element">
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
            {element.atomicMass}
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
