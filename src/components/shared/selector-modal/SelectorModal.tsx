import classNames from "classnames";
import * as React from "react";
import Button from "../button/Button";
import Modal, { IModalProps } from "../modal/Modal";
import "./SelectorModal.scss";

export interface SelectorModalOption {
  key: any;
  text: string;
}

interface SelectorModalProps extends IModalProps {
  options: SelectorModalOption[];
  onOptionSelected: (option: SelectorModalOption) => void;
}

function SelectorModal(props: SelectorModalProps) {
  return (
    <Modal className={classNames("selector-modal", props.className)} {...props}>
      {props.options.map((option) => (
        <Button
          key={option.key}
          className="selector-modal__option"
          onClick={() => props.onOptionSelected(option)}
        >
          {option.text}
        </Button>
      ))}
    </Modal>
  );
}

export default SelectorModal;
