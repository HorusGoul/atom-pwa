import classNames from "classnames";
import * as React from "react";
import { useEffect, FC } from "react";
import { Portal } from "react-portal";
import IconButton from "../icon-button/IconButton";
import Overlay from "../overlay/Overlay";
import "./Modal.scss";

export interface IModalProps {
  open: boolean;
  onOpen?: () => void;
  onClose: () => void;
  className?: string;
  title?: string;
  closeButton?: boolean;
}

export interface IModalState {
  open: boolean;
}

const Modal: FC<IModalProps> = ({
  open,
  title,
  closeButton,
  onClose,
  className,
  ...props
}) => {
  const showHeader = !!title || closeButton;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = open ? "hidden" : "";
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <React.Fragment>
        <Overlay open={open} onClick={onClose} />

        <div
          className={classNames("modal", className)}
          role="dialog"
          aria-modal
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
                  onClick={onClose}
                />
              )}
            </div>
          )}

          {props?.children}
        </div>
      </React.Fragment>
    </Portal>
  );
};

export default Modal;
