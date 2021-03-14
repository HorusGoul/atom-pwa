import classNames from "classnames";
import * as React from "react";
import { useEffect, ReactNode } from "react";
import { Portal } from "react-portal";
import IconButton from "../icon-button/IconButton";
import Overlay from "../overlay/Overlay";
import "./Modal.scss";

export interface IModalProps {
  open: boolean;
  onClose?: () => void;
  className?: string;
  title?: string;
  closeButton?: boolean;
  children?: ReactNode;
}

export interface IModalState {
  open: boolean;
}

const Modal = ({
  open,
  title,
  closeButton,
  onClose,
  className,
  ...props
}: IModalProps) => {
  const showHeader = !!title || closeButton;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <>
        <Overlay onClick={onClose} />

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

          {props.children}
        </div>
      </>
    </Portal>
  );
};

export default Modal;
