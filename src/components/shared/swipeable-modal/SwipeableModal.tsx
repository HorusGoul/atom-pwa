import anime from "animejs";
import classNames from "classnames";
import * as React from "react";
import { Portal } from "react-portal";
import IconButton from "../icon-button/IconButton";
import { IModalProps, IModalState } from "../modal/Modal";
import "../modal/Modal.scss";
import Overlay from "../overlay/Overlay";

interface ISwipeableModalState extends IModalState {
  translateX: string;
  lastPosition: number | null;
  opacity: number;
  swiping: boolean;
}

const initialState = {
  lastPosition: null,
  opacity: 1,
  swiping: false,
  translateX: "-50%",
};

// @autobind
// class SwipeableModal extends React.Component<
//   IModalProps,
//   ISwipeableModalState
// > {
//   public state: ISwipeableModalState = {
//     ...initialState,
//     open: this.props.open,
//   };

//   private frontDiv: HTMLDivElement | null = null;
//   private mcFrontDiv: HammerManager | null = null;
//   private frontDivAnimation: anime.AnimeInstance | null = null;
//   private initialDivPosition = -1;

//   public componentWillUnmount() {
//     this.killHammer();
//   }

//   public UNSAFE_componentWillReceiveProps(nextProps: IModalProps) {
//     if (nextProps.open !== this.props.open) {
//       this.setState({ open: nextProps.open });
//       this.bodyOverflow(nextProps.open);
//     }
//   }

//   public shouldComponentUpdate(
//     nextProps: IModalProps,
//     nextState: ISwipeableModalState
//   ) {
//     if (nextState.open || this.state.open) {
//       return true;
//     }

//     return false;
//   }

//   public UNSAFE_componentWillUpdate(
//     nextProps: IModalProps,
//     nextState: ISwipeableModalState
//   ) {
//     if (!nextState.open) {
//       this.killHammer();
//     }
//   }

//   public render() {
//     const { title, closeButton } = this.props;
//     const showHeader = !!title || closeButton;
//     const { translateX, opacity, open } = this.state;

//     if (!open) {
//       return null;
//     }

//     return (
//       <Portal>
//         <React.Fragment>
//           <Overlay opacity={opacity} onClick={this.close} />

//           <div
//             ref={this.setModalDiv}
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="modal-title"
//             className={classNames("modal", this.props.className)}
//             style={{
//               opacity,
//               transform: `translate(${translateX}, -50%)`,
//             }}
//           >
//             {showHeader && (
//               <div className="modal__header">
//                 {title && (
//                   <span id="modal-title" className="modal__header__title">
//                     {title}
//                   </span>
//                 )}

//                 {closeButton && (
//                   <IconButton
//                     className="modal__header__close-button"
//                     iconName="close"
//                     onClick={this.close}
//                   />
//                 )}
//               </div>
//             )}

//             {this.props.children}
//           </div>
//         </React.Fragment>
//       </Portal>
//     );
//   }

//   private bodyOverflow(open: boolean) {
//     document.body.style.overflow = open ? "hidden" : "";
//   }

//   private killHammer() {
//     if (!this.mcFrontDiv) {
//       return;
//     }

//     this.mcFrontDiv.destroy();
//     this.mcFrontDiv = null;
//   }

//   private setModalDiv(div: HTMLDivElement) {
//     this.frontDiv = div;

//     if (!this.mcFrontDiv && div) {
//       this.mcFrontDiv = new Hammer(this.frontDiv);
//       this.mcFrontDiv
//         .get("pan")
//         .set({ direction: Hammer.DIRECTION_HORIZONTAL });
//       this.mcFrontDiv.on("pan", this.onPan);

//       const divWidth = this.frontDiv.getBoundingClientRect().width;
//       this.initialDivPosition = -(divWidth / 2);
//     }
//   }

//   private close() {
//     this.setState({ ...initialState, open: false });

//     if (this.props.onClose) {
//       this.props.onClose();
//     }
//   }

//   private onPan(event: HammerInput) {
//     const { lastPosition } = this.state;
//     const { deltaX } = event;

//     if (this.frontDivAnimation) {
//       this.frontDivAnimation.pause();
//       this.frontDivAnimation = null;
//     }

//     let frontPosition =
//       lastPosition === null
//         ? 0 + deltaX + this.initialDivPosition
//         : lastPosition + deltaX;

//     if (frontPosition < this.initialDivPosition) {
//       frontPosition = this.initialDivPosition;
//     }

//     if (!this.frontDiv) {
//       return;
//     }

//     const swipableWidth = this.frontDiv.clientWidth;

//     const swipeRatio = this.swipeRatio(frontPosition, swipableWidth);

//     if (event.isFinal) {
//       this.onFinal(frontPosition, swipeRatio);
//     } else {
//       this.setState({
//         opacity: 1 - swipeRatio,
//         swiping: true,
//         translateX: `${frontPosition}px`,
//       });
//     }
//   }

//   private onFinal(currentPosition: number, swipeRatio: number) {
//     if (!this.frontDiv) {
//       return;
//     }

//     const swipableWidth = this.frontDiv.clientWidth;
//     const triggerDelete = swipeRatio >= 0.5;
//     const positionTarget = triggerDelete
//       ? swipableWidth
//       : this.initialDivPosition;

//     const animateObject = { position: currentPosition };
//     this.frontDivAnimation = anime({
//       complete: () => {
//         if (triggerDelete) {
//           this.onAction();
//         }
//       },
//       duration: 250,
//       easing: "linear",
//       opacity: 0,
//       position: positionTarget,
//       targets: animateObject,
//       update: () => {
//         this.setState({
//           lastPosition: animateObject.position,
//           opacity: 1 - this.swipeRatio(animateObject.position, swipableWidth),
//           swiping: false,
//           translateX: `${animateObject.position}px`,
//         });
//       },
//     });
//   }

//   private swipeRatio(position: number, width: number) {
//     const initialPosition = this.initialDivPosition;
//     const diff = position - initialPosition;

//     return diff / width;
//   }

//   private onAction() {
//     this.close();
//   }
// }

function SwipeableModal(props: IModalProps) {
  const [modalState, setModalState] = React.useState<ISwipeableModalState>({
    ...initialState,
    open: props.open,
  });
  let frontDiv: HTMLDivElement | null = null;
  let mcFrontDiv: HammerManager | null = null;
  let frontDivAnimation: anime.AnimeInstance | null = null;
  let initialDivPosition = -1;

  const { title, closeButton } = props;
  const showHeader = !!title || closeButton;
  const { translateX, opacity, open } = modalState;

  const killHammer = () => {
    if (!mcFrontDiv) {
      return;
    }

    mcFrontDiv.destroy();
    mcFrontDiv = null;
  };

  const bodyOverflow = (open: boolean) => {
    document.body.style.overflow = open ? "hidden" : "";
  };

  React.useEffect(() => {
    if (props.open !== modalState.open) {
      setModalState({ ...modalState, open: props.open });
      bodyOverflow(props.open);
    }
    return () => {
      killHammer();
    };
  }, [props]);

  const close = () => {
    setModalState({ ...initialState, open: false });

    if (props.onClose) {
      props.onClose();
    }
  };

  const setModalDiv = (div: HTMLDivElement) => {
    frontDiv = div;

    if (!mcFrontDiv && div) {
      mcFrontDiv = new Hammer(frontDiv);
      mcFrontDiv.get("pan").set({ direction: Hammer.DIRECTION_HORIZONTAL });
      mcFrontDiv.on("pan", onPan);

      const divWidth = frontDiv.getBoundingClientRect().width;
      initialDivPosition = -(divWidth / 2);
    }
  };

  const swipeRatio = (position: number, width: number) => {
    const initialPosition = initialDivPosition;
    const diff = position - initialPosition;

    return diff / width;
  };

  const onPan = (event: HammerInput) => {
    const { lastPosition } = modalState;
    const { deltaX } = event;

    if (frontDivAnimation) {
      frontDivAnimation.pause();
      frontDivAnimation = null;
    }

    let frontPosition =
      lastPosition === null
        ? 0 + deltaX + initialDivPosition
        : lastPosition + deltaX;

    if (frontPosition < initialDivPosition) {
      frontPosition = initialDivPosition;
    }

    if (!frontDiv) {
      return;
    }

    const swipableWidth = frontDiv.clientWidth;
    const ratio = swipeRatio(frontPosition, swipableWidth);

    if (event.isFinal) {
      onFinal(frontPosition, ratio);
    } else {
      setModalState({
        ...modalState,
        opacity: 1 - ratio,
        swiping: true,
        translateX: `${frontPosition}px`,
      });
    }
  };

  const onFinal = (currentPosition: number, calculatedSwipeRatio: number) => {
    if (!frontDiv) {
      return;
    }

    const swipableWidth = frontDiv.clientWidth;
    const triggerDelete = calculatedSwipeRatio >= 0.5;
    const positionTarget = triggerDelete ? swipableWidth : initialDivPosition;

    const animateObject = { position: currentPosition };
    frontDivAnimation = anime({
      complete: () => {
        if (triggerDelete) {
          onAction();
        }
      },
      duration: 250,
      easing: "linear",
      opacity: 0,
      position: positionTarget,
      targets: animateObject,
      update: () => {
        setModalState({
          ...modalState,
          lastPosition: animateObject.position,
          opacity: 1 - swipeRatio(animateObject.position, swipableWidth),
          swiping: false,
          translateX: `${animateObject.position}px`,
        });
      },
    });
  };

  const onAction = () => {
    close();
  };

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <React.Fragment>
        <Overlay opacity={opacity} onClick={close} />
        <div
          ref={setModalDiv}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className={classNames("modal", props.className)}
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
                  onClick={close}
                />
              )}
            </div>
          )}

          {props.children}
        </div>
      </React.Fragment>
    </Portal>
  );
}

export default SwipeableModal;
