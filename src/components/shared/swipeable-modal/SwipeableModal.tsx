import anime from "animejs";
import classNames from "classnames";
import * as React from "react";
import { Portal } from "react-portal";
import IconButton from "../icon-button/IconButton";
import { IModalProps } from "../modal/Modal";
import "../modal/Modal.scss";
import Overlay from "../overlay/Overlay";

type ModalContentProps = Omit<IModalProps, "open">;

function useSwipeToClose(onClose?: () => void) {
  const [lastPosition, setLastPosition] = React.useState<number | null>(null);
  const [opacity, setOpacity] = React.useState(1);
  const [translateX, setTranslateX] = React.useState("-50%");

  const frontDivRef = React.useRef<HTMLDivElement | null>(null);
  const mcFrontDivRef = React.useRef<HammerManager | null>(null);
  const frontDivAnimationRef = React.useRef<anime.AnimeInstance | null>(null);
  const initialDivPositionRef = React.useRef(-1);

  React.useEffect(() => {
    if (!mcFrontDivRef.current && frontDivRef.current) {
      mcFrontDivRef.current = new Hammer(frontDivRef.current);
      mcFrontDivRef.current
        .get("pan")
        .set({ direction: Hammer.DIRECTION_HORIZONTAL });
      mcFrontDivRef.current.on("pan", onPan);

      const divWidth = frontDivRef.current.getBoundingClientRect().width;
      initialDivPositionRef.current = -(divWidth / 2);
    }
    return () => {
      if (!mcFrontDivRef.current) {
        return;
      }

      mcFrontDivRef.current.destroy();
      mcFrontDivRef.current = null;
    };
  }, []);

  const swipeRatio = (position: number, width: number) => {
    const diff = position - initialDivPositionRef.current;

    return diff / width;
  };

  const onPan = (event: HammerInput) => {
    const { deltaX } = event;

    if (frontDivAnimationRef.current) {
      frontDivAnimationRef.current.pause();
      frontDivAnimationRef.current = null;
    }

    let frontPosition =
      lastPosition === null
        ? 0 + deltaX + initialDivPositionRef.current
        : lastPosition + deltaX;

    if (frontPosition < initialDivPositionRef.current) {
      frontPosition = initialDivPositionRef.current;
    }

    if (!frontDivRef.current) {
      return;
    }

    const swipeableWidth = frontDivRef.current.clientWidth;
    const ratio = swipeRatio(frontPosition, swipeableWidth);

    if (event.isFinal) {
      onFinal(frontPosition, ratio);
    } else {
      setOpacity(1 - ratio);
      setTranslateX(`${frontPosition}px`);
    }
  };

  const onFinal = (currentPosition: number, calculatedSwipeRatio: number) => {
    if (!frontDivRef.current) {
      return;
    }

    const swipeableWidth = frontDivRef.current.clientWidth;
    const triggerDelete = calculatedSwipeRatio >= 0.5;
    const positionTarget = triggerDelete
      ? swipeableWidth
      : initialDivPositionRef.current;

    const animateObject = { position: currentPosition };
    frontDivAnimationRef.current = anime({
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
        setOpacity(1 - swipeRatio(animateObject.position, swipeableWidth));
        setTranslateX(`${animateObject.position}px`);
      },
    });
  };

  return {
    frontDivRef,
    opacity,
    translateX,
  };
}

function useLockedBackgroundContent() {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
}

function SwipeableModalContent({
  title,
  closeButton,
  onClose,
  className,
  children,
}: ModalContentProps) {
  const showHeader = !!title || closeButton;
  const { frontDivRef, opacity, translateX } = useSwipeToClose(onClose);

  useLockedBackgroundContent();

  return (
    <>
      <Overlay opacity={opacity} onClick={onClose} />

      <div
        ref={frontDivRef}
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

function SwipeableModal({ open, ...contentProps }: IModalProps) {
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <SwipeableModalContent {...contentProps} />
    </Portal>
  );
}

export default SwipeableModal;
