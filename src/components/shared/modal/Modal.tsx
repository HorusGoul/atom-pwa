import classNames from "classnames";
import * as React from "react";
import { useEffect, ReactNode } from "react";
import Portal from "@/components/shared/portal/Portal";
import IconButton from "../icon-button/IconButton";
import Overlay from "../overlay/Overlay";
import "./Modal.scss";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  className?: string;
  title?: string;
  closeButton?: boolean;
  children?: ReactNode;
}

export interface ModalState {
  open: boolean;
}

const Modal = ({
  open,
  title,
  closeButton,
  onClose,
  className,
  ...props
}: ModalProps) => {
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
