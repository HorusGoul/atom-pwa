import anime from "animejs";
import classNames from "classnames";
import * as React from "react";
import { Portal } from "react-portal";
import IconButton from "../icon-button/IconButton";
import { IModalProps } from "../modal/Modal";
import "../modal/Modal.scss";
import Overlay from "../overlay/Overlay";

type ModalContentProps = Omit<IModalProps, "open">;

function SwipeableModalContent({
  title,
  closeButton,
  onClose,
  className,
  children,
}: ModalContentProps) {
  const [lastPosition, setLastPosition] = React.useState<number | null>(null);
  const [opacity, setOpacity] = React.useState(1);
  const [translateX, setTranslateX] = React.useState("-50%");

  const frontDiv = React.useRef<HTMLDivElement | null>(null);
  const mcFrontDiv = React.useRef<HammerManager | null>(null);
  const frontDivAnimation = React.useRef<anime.AnimeInstance | null>(null);
  const initialDivPosition = React.useRef(-1);

  const showHeader = !!title || closeButton;

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  React.useEffect(() => {
    if (!mcFrontDiv.current && frontDiv.current) {
      mcFrontDiv.current = new Hammer(frontDiv.current);
      mcFrontDiv.current
        .get("pan")
        .set({ direction: Hammer.DIRECTION_HORIZONTAL });
      mcFrontDiv.current.on("pan", onPan);

      const divWidth = frontDiv.current.getBoundingClientRect().width;
      initialDivPosition.current = -(divWidth / 2);
    }
    return () => {
      if (!mcFrontDiv.current) {
        return;
      }

      mcFrontDiv.current?.destroy();
      mcFrontDiv.current = null;
    };
  }, []);

  const swipeRatio = (position: number, width: number) => {
    const diff = position - initialDivPosition.current;

    return diff / width;
  };

  const onPan = (event: HammerInput) => {
    const { deltaX } = event;

    if (frontDivAnimation) {
      frontDivAnimation.current?.pause();
      frontDivAnimation.current = null;
    }

    let frontPosition =
      lastPosition === null
        ? 0 + deltaX + initialDivPosition.current
        : lastPosition + deltaX;

    if (frontPosition < initialDivPosition.current) {
      frontPosition = initialDivPosition.current;
    }

    if (!frontDiv) {
      return;
    }

    const swipableWidth = frontDiv.current!.clientWidth;
    const ratio = swipeRatio(frontPosition, swipableWidth);

    if (event.isFinal) {
      onFinal(frontPosition, ratio);
    } else {
      setOpacity(1 - ratio);
      setTranslateX(`${frontPosition}px`);
    }
  };

  const onFinal = (currentPosition: number, calculatedSwipeRatio: number) => {
    if (!frontDiv) {
      return;
    }

    const swipableWidth = frontDiv.current!.clientWidth;
    const triggerDelete = calculatedSwipeRatio >= 0.5;
    const positionTarget = triggerDelete ? swipableWidth : initialDivPosition;

    const animateObject = { position: currentPosition };
    frontDivAnimation.current = anime({
      complete: () => {
        if (triggerDelete) {
          onClose?.();
        }
      },
      duration: 250,
      easing: "linear",
      opacity: 0,
      position: positionTarget,
      targets: animateObject,
      update: () => {
        setLastPosition(animateObject.position);
        setOpacity(1 - swipeRatio(animateObject.position, swipableWidth));
        setTranslateX(`${animateObject.position}px`);
      },
    });
  };

  return (
    <>
      <Overlay opacity={opacity} onClick={onClose} />

      <div
        ref={frontDiv}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={classNames("modal", className)}
        style={{
          opacity,
          transform: `translate(${translateX}, -50%)`,
        }}
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

        {children}
      </div>
    </>
  );
}

function SwipeableModal({ open, onClose, ...contentProps }: IModalProps) {
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <SwipeableModalContent {...contentProps} onClose={onClose} />
    </Portal>
  );
}

export default SwipeableModal;
