import autobind from "autobind-decorator";
import classNames from "classnames";
import * as React from "react";
import Button from "../button/Button";
import Modal, { IModalProps } from "../modal/Modal";
import "./SelectorModal.scss";

export interface ISelectorModalOption {
  key: any;
  text: string;
}

interface ISelectorModalProps extends IModalProps {
  options: ISelectorModalOption[];
  onOptionSelected: (option: ISelectorModalOption) => void;
}

@autobind
class SelectorModal extends React.Component<ISelectorModalProps, {}> {
  public render() {
    const { options, className } = this.props;

    return (
      <Modal
        className={classNames("selector-modal", className)}
        {...this.props}
      >
        {options.map((option) => (
          <Button
            key={option.key}
            className="selector-modal__option"
            onClick={this.onOptionSelected(option)}
          >
            {option.text}
          </Button>
        ))}
      </Modal>
    );
  }

  private onOptionSelected(option: ISelectorModalOption) {
    return () => this.props.onOptionSelected(option);
  }
}

export default SelectorModal;
