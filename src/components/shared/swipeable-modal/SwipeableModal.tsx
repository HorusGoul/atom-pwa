import anime = require("animejs");
import autobind from "autobind-decorator";
import classNames = require("classnames");
import * as React from "react";
import * as Portal from "react-portal";
import IconButton from "../icon-button/IconButton";
import Modal, { IModalProps, IModalState } from "../modal/Modal";
import "../modal/Modal.scss";
import Overlay from "../overlay/Overlay";

interface ISwipeableModalState extends IModalState {
  translateX: string;
  lastPosition: number;
  opacity: number;
  swiping: boolean;
}

const initialState = {
  lastPosition: null as number,
  opacity: 1,
  swiping: false,
  translateX: "-50%"
};

@autobind
class SwipeableModal extends React.Component<
  IModalProps,
  ISwipeableModalState
> {
  public static defaultProps: IModalProps = Modal.defaultProps;

  public state: ISwipeableModalState = {
    ...initialState,
    open: this.props.open
  };

  private frontDiv: HTMLDivElement;
  private mcFrontDiv: HammerManager;
  private frontDivAnimation: anime.AnimeInstance;
  private initialDivPosition: number;

  public componentWillUnmount() {
    this.killHammer();
  }

  public componentWillReceiveProps(nextProps: IModalProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open });
      this.bodyOverflow(nextProps.open);
    }
  }

  public shouldComponentUpdate(
    nextProps: IModalProps,
    nextState: ISwipeableModalState
  ) {
    if (nextState.open || this.state.open) {
      return true;
    }

    return false;
  }

  public componentWillUpdate(
    nextProps: IModalProps,
    nextState: ISwipeableModalState
  ) {
    if (!nextState.open) {
      this.killHammer();
    }
  }

  public render() {
    const { title, closeButton } = this.props;
    const showHeader = !!title || closeButton;
    const { translateX, opacity, open, swiping } = this.state;

    return (
      <Portal isOpened={open} onClose={this.close} onOpen={this.open}>
        <React.Fragment>
          <Overlay opacity={opacity} open={open} onClick={this.close} />

          <div
            ref={this.setModalDiv}
            className={classNames("modal", this.props.className)}
            style={{
              opacity,
              transform: `translate(${translateX}, -50%)`
            }}
          >
            {showHeader && (
              <div className="modal__header">
                {title && <span className="modal__header__title">{title}</span>}

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
    document.body.style.overflow = open ? "hidden" : "initial";
  }

  private killHammer() {
    if (!this.mcFrontDiv) {
      return;
    }

    this.mcFrontDiv.destroy();
    this.mcFrontDiv = null;
  }

  private setModalDiv(div: HTMLDivElement) {
    this.frontDiv = div;

    if (!this.mcFrontDiv && div) {
      this.mcFrontDiv = new Hammer(this.frontDiv);
      this.mcFrontDiv
        .get("pan")
        .set({ direction: Hammer.DIRECTION_HORIZONTAL });
      this.mcFrontDiv.on("pan", this.onPan);

      const divWidth = this.frontDiv.getBoundingClientRect().width;
      this.initialDivPosition = -(divWidth / 2);
    }
  }

  private open() {
    this.setState({ open: true });

    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  private close() {
    this.setState({ ...initialState, open: false });

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  private onPan(event: HammerInput) {
    const { translateX, lastPosition } = this.state;
    const { deltaX } = event;

    if (this.frontDivAnimation) {
      this.frontDivAnimation.pause();
      delete this.frontDivAnimation;
    }

    let frontPosition =
      lastPosition === null
        ? 0 + deltaX + this.initialDivPosition
        : lastPosition + deltaX;

    if (frontPosition < this.initialDivPosition) {
      frontPosition = this.initialDivPosition;
    }

    const swipeRatio = this.swipeRatio(frontPosition);

    if (event.isFinal) {
      this.onFinal(frontPosition, swipeRatio);
    } else {
      this.setState({
        opacity: 1 - swipeRatio,
        swiping: true,
        translateX: `${frontPosition}px`
      });
    }
  }

  private onFinal(currentPosition: number, swipeRatio: number) {
    const swipableWidth = this.frontDiv.clientWidth;
    const triggerDelete = swipeRatio >= 0.5;
    const positionTarget = triggerDelete
      ? swipableWidth
      : this.initialDivPosition;

    const animateObject = { position: currentPosition };
    this.frontDivAnimation = anime({
      complete: () => {
        if (triggerDelete) {
          this.onAction();
        }
      },
      duration: 250,
      easing: "linear",
      opacity: 0,
      position: positionTarget,
      targets: animateObject,
      update: () => {
        this.setState({
          lastPosition: animateObject.position,
          opacity: 1 - this.swipeRatio(animateObject.position),
          swiping: false,
          translateX: `${animateObject.position}px`
        });
      }
    });
  }

  private swipeRatio(position: number) {
    const initialPosition = this.initialDivPosition;
    const width = this.frontDiv.clientWidth;
    const diff = position - initialPosition;

    return diff / width;
  }

  private onAction() {
    this.close();
  }
}

export default SwipeableModal;
