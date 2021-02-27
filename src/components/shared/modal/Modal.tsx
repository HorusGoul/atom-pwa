import autobind from "autobind-decorator";
import classNames from "classnames";
import * as React from "react";
import { Portal } from "react-portal";
import IconButton from "../icon-button/IconButton";
import Overlay from "../overlay/Overlay";
import "./Modal.scss";

export interface IModalProps {
  open: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
  title?: string;
  closeButton?: boolean;
}

export interface IModalState {
  open: boolean;
}

@autobind
class Modal extends React.Component<IModalProps, IModalState> {
  public static defaultProps: IModalProps = {
    closeButton: false,
    open: false,
  };

  public state: IModalState = {
    open: this.props.open,
  };

  public componentDidMount() {
    this.bodyOverflow(this.state.open);
  }

  public componentWillUnmount() {
    this.bodyOverflow(false);
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IModalProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open });
      this.bodyOverflow(nextProps.open);
    }
  }

  public render() {
    const { title, closeButton } = this.props;
    const showHeader = !!title || closeButton;

    if (!this.state.open) {
      return null;
    }

    return (
      <Portal>
        <React.Fragment>
          <Overlay open={this.state.open} onClick={this.close} />

          <div
            className={classNames("modal", this.props.className)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {showHeader && (
              <div className="modal__header">
                {title && (
                  <span id="modal-title" className="modal__header__title">
                    {title}
                  </span>
                )}

                {closeButton && (
                  <IconButton
                    className="modal__header__close-button"
                    iconName="close"
                    onClick={this.close}
                  />
                )}
              </div>
            )}

            {this.props.children}
          </div>
        </React.Fragment>
      </Portal>
    );
  }

  private bodyOverflow(open: boolean) {
    document.body.style.overflow = open ? "hidden" : "";
  }

  private open() {
    this.setState({ open: true });

    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  private close() {
    this.setState({ open: false });

    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}

export default Modal;
