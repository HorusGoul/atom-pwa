import * as React from "react";
import Modal from "../shared/modal/Modal";
import ElementPicker from "../element-picker/ElementPicker";

interface AddElementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (atomic: number) => void;
}

function AddElementModal({ isOpen, onClose, onAdd }: AddElementModalProps) {
  return (
    <Modal
      className="mass-calculator__add-element-modal"
      open={isOpen}
      onClose={onClose}
    >
      <ElementPicker onElement={(element) => onAdd(element.atomic)} />
    </Modal>
  );
}

export default AddElementModal;
