import * as React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "../../Locale";
import { MAIN_MENU } from "../../routes";
import IconButton from "../shared/icon-button/IconButton";
import ListItemSwipeAction from "../shared/list-item-swipe-action/ListItemSwipeAction";
import Navbar from "../shared/navbar/Navbar";
import AddElementModal from "./AddElementModal";
import EditElementModal from "./EditElementModal";
import CalculatorElement from "./CalculatorElement";
import { useMassCalculator } from "./hooks/useMassCalculator";
import { useModal } from "./hooks/useModal";
import "./MassCalculator.scss";

function MassCalculator() {
  const {
    elements,
    setElements,
    calculateTotalValue,
    clearElements,
    selectElement,
    removeElement,
    addElement,
    currentEditedElement,
    setEditedElement,
    increaseAmount,
    decreaseAmount,
    changeAmount,
  } = useMassCalculator();
  const { addModal, editModal } = useModal();
  const history = useHistory();

  const onNavbarBackButtonClick = React.useCallback(() => {
    history.push(MAIN_MENU);
  }, [history]);

  return (
    <div className="mass-calculator">
      <Navbar
        title={i18n("mass_calculator")}
        onBackButtonClick={onNavbarBackButtonClick}
      />
      <div className="mass-calculator__result-bar">
        <span className="mass-calculator__result-bar__text">
          {i18n("result")}
        </span>

        <span className="mass-calculator__result-bar__value">
          {calculateTotalValue()} {i18n("g_mol")}
        </span>
      </div>
      <div className="mass-calculator__controls">
        <IconButton
          onClick={addModal.open}
          iconName="add_circle"
          text={i18n("add_element")}
        />

        <IconButton
          onClick={clearElements}
          iconName="clear_all"
          text={i18n("clear_elements")}
        />
      </div>
      <div className="mass-calculator__element-list">
        {elements.map(({ atomic, quantity }) => (
          <ListItemSwipeAction
            key={atomic}
            className="mass-calculator__swipe-item"
            frontContent={
              <CalculatorElement
                atomic={atomic}
                quantity={quantity}
                selectElement={(atomic) => {
                  editModal.open();
                  selectElement(atomic);
                }}
              />
            }
            onAction={() => removeElement(atomic)}
          />
        ))}
      </div>
      <AddElementModal
        isOpen={addModal.isOpen}
        onClose={addModal.close}
        onAdd={(atomic) => {
          addModal.close();
          addElement(atomic);
        }}
      />
      <EditElementModal
        isOpen={editModal.isOpen}
        selectedElement={currentEditedElement()}
        onClose={() => {
          setElements(elements.filter((element) => element.quantity > 0));
          setEditedElement(-1);
          editModal.close();
        }}
        increaseQuantity={increaseAmount}
        decreaseQuantity={decreaseAmount}
        changeQuantity={changeAmount}
      />
    </div>
  );
}

export default MassCalculator;
