import anime from "animejs";
import autobind from "autobind-decorator";
import classNames from "classnames";
import Hammer from "hammerjs";
import * as React from "react";

import "./ListItemSwipeAction.scss";

interface IListItemSwipeActionProps {
  onAction?: () => void;
  className?: string;
  backContent?: React.ReactNode;
  frontContent?: React.ReactNode;
}

interface IListItemSwipeActionState {
  translateX: string;
  lastPosition: number;
  opacity: number;
  height: string;
}

@autobind
class ListItemSwipeAction extends React.Component<
  IListItemSwipeActionProps,
  IListItemSwipeActionState
> {
  public state: IListItemSwipeActionState = {
    height: "auto",
    lastPosition: 0,
    opacity: 1,
    translateX: "0%"
  };

  private frontDiv: HTMLDivElement;
  private mcFrontDiv: HammerManager;
  private frontDivAnimation: anime.AnimeInstance;

  public componentDidMount() {
    this.mcFrontDiv = new Hammer(this.frontDiv);

    this.mcFrontDiv.get("pan").set({ direction: Hammer.DIRECTION_HORIZONTAL });
    this.mcFrontDiv.on("pan", this.onPan);
  }

  public componentWillUnmount() {
    this.mcFrontDiv.destroy();
  }

  public render() {
    const { className, frontContent, backContent } = this.props;
    const { translateX, opacity, height } = this.state;

    return (
      <div
        className={classNames("swipe-delete", className)}
        style={{ opacity, height }}
      >
        <div
          ref={div => (this.frontDiv = div)}
          className={classNames("swipe-delete__front")}
          style={{
            transform: `translateX(${translateX})`
          }}
        >
          {frontContent}
        </div>

        <div className="swipe-delete__back">{backContent}</div>
      </div>
    );
  }

  private onPan(event: HammerInput) {
    const { translateX, lastPosition } = this.state;
    const { deltaX } = event;

    if (this.frontDivAnimation) {
      this.frontDivAnimation.pause();
      delete this.frontDivAnimation;
    }

    let frontPosition = lastPosition + deltaX;

    if (frontPosition < 0) {
      frontPosition = 0;
    }

    if (event.isFinal) {
      this.onFinal(frontPosition);
    } else {
      this.setState({
        translateX: `${frontPosition}px`
      });
    }
  }

  private onFinal(currentPosition: number) {
    const swipableWidth = this.frontDiv.getBoundingClientRect().width;
    const triggerDelete = currentPosition / swipableWidth > 0.25;
    const positionTarget = triggerDelete ? swipableWidth : 0;

    const animateObject = { position: currentPosition };
    this.frontDivAnimation = anime({
      complete: () => {
        if (triggerDelete) {
          this.onAction();
        }
      },
      duration: 250,
      easing: "linear",
      position: positionTarget,
      targets: animateObject,
      update: () => {
        this.setState({
          lastPosition: animateObject.position,
          translateX: `${animateObject.position}px`
        });
      }
    });
  }

  private onAction() {
    const animateObject = {
      height: this.frontDiv.clientHeight,
      opacity: 1
    };

    anime({
      complete: () => {
        if (this.props.onAction) {
          this.props.onAction();
        }
      },
      duration: 250,
      easing: "linear",
      height: 0,
      opacity: 0,
      targets: animateObject,
      update: () => {
        this.setState({
          height: `${animateObject.height}px`,
          opacity: animateObject.opacity
        });
      }
    });
  }
}

export default ListItemSwipeAction;
