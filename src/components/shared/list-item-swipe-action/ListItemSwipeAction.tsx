import anime from "animejs";
import classNames from "classnames";
import * as React from "react";

import "./ListItemSwipeAction.scss";

interface IListItemSwipeActionProps {
  onAction?: () => void;
  className?: string;
  backContent?: React.ReactNode;
  frontContent?: React.ReactNode;
}

function ListItemSwipeAction({
  className,
  backContent,
  frontContent,
  onAction: onActionProp,
}: IListItemSwipeActionProps) {
  const [height, setHeight] = React.useState("auto");
  const [lastPosition, setLastPosition] = React.useState(0);
  const [opacity, setOpacity] = React.useState(1);
  const [translateX, setTranslateX] = React.useState("0%");

  const frontDivRef = React.useRef<HTMLDivElement | null>(null);
  const mcFrontDivRef = React.useRef<HammerManager | null>(null);
  const frontDivAnimationRef = React.useRef<anime.AnimeInstance | null>(null);

  function onAction() {
    if (!frontDivRef.current) return;
    const animateObject = {
      height: frontDivRef.current.clientHeight,
      opacity: 1,
    };

    anime({
      complete: () => {
        if (onActionProp) {
          onActionProp();
        }
      },
      duration: 250,
      easing: "linear",
      height: 0,
      opacity: 0,
      targets: animateObject,
      update: () => {
        setHeight(`${animateObject.height}px`);
        setOpacity(animateObject.opacity);
      },
    });
  }

  function onFinal(currentPosition: number) {
    if (!frontDivRef.current) return;
    const swipableWidth = frontDivRef.current.getBoundingClientRect().width;
    const triggerDelete = currentPosition / swipableWidth > 0.25;
    const positionTarget = triggerDelete ? swipableWidth : 0;

    const animateObject = { position: currentPosition };
    frontDivAnimationRef.current = anime({
      complete: () => {
        if (triggerDelete) {
          onAction();
        }
      },
      duration: 250,
      easing: "linear",
      position: positionTarget,
      targets: animateObject,
      update: () => {
        setLastPosition(animateObject.position);
        setTranslateX(`${animateObject.position}px`);
      },
    });
  }

  function onPan(event: HammerInput) {
    const { deltaX } = event;

    if (frontDivAnimationRef.current) {
      frontDivAnimationRef.current.pause();
      frontDivAnimationRef.current = null;
    }

    let frontPosition = lastPosition + deltaX;

    if (frontPosition < 0) {
      frontPosition = 0;
    }

    if (event.isFinal) {
      onFinal(frontPosition);
    } else {
      setTranslateX(`${frontPosition}px`);
    }
  }

  React.useEffect(() => {
    if (!frontDivRef.current) return;
    mcFrontDivRef.current = new Hammer(frontDivRef.current);

    mcFrontDivRef.current
      .get("pan")
      .set({ direction: Hammer.DIRECTION_HORIZONTAL });
    mcFrontDivRef.current.on("pan", onPan);

    return () => {
      mcFrontDivRef.current?.destroy();
    };
  });

  return (
    <div
      className={classNames("swipe-delete", className)}
      style={{ opacity, height }}
    >
      <div
        ref={frontDivRef}
        className={classNames("swipe-delete__front")}
        style={{
          transform: `translateX(${translateX})`,
        }}
      >
        {frontContent}
      </div>

      <div className="swipe-delete__back">{backContent}</div>
    </div>
  );
}

export default ListItemSwipeAction;
