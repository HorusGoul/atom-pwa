import * as React from "react";
import IconButton from "../shared/icon-button/IconButton";
import Modal from "../shared/modal/Modal";
import { i18n } from "../../Locale";
import ElementManager, { getElementLocales } from "../../ElementManager";
import { IMassCalculatorElement } from "./hooks/useMassCalculator";

interface EditElementModalProps {
  isOpen: boolean;
  onClose: () => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  changeQuantity: (quantity: number) => void;
  selectedElement?: IMassCalculatorElement;
}

function EditElementModal({
  isOpen,
  selectedElement,
  increaseQuantity,
  decreaseQuantity,
  changeQuantity,
  onClose,
}: EditElementModalProps) {
  if (!selectedElement) return null;

  const element = ElementManager.getElement(selectedElement.atomic);

  if (!element) {
    return null;
  }

  const elementLocales = getElementLocales(element);

  return (
    <Modal
      title={elementLocales.name}
      closeButton={true}
      className="mass-calculator__modify-element-modal"
      open={isOpen}
      onClose={onClose}
    >
      <div className="mass-calculator__modify-element-modal__controls">
        <IconButton iconName="remove" onClick={decreaseQuantity} />

        <input
          className="mass-calculator__modify-element-modal__amount-input"
          type="tel"
          name="amount"
          value={selectedElement.quantity}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            const amount = parseInt(event.currentTarget.value, 10);
            changeQuantity(amount);
          }}
        />

        <IconButton iconName="add" onClick={increaseQuantity} />
      </div>

      <div className="mass-calculator__modify-element-modal__text">
        {i18n("change_amount")}
      </div>
    </Modal>
  );
}

export default EditElementModal;
