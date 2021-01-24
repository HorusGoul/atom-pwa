import autobind from "autobind-decorator";
import * as React from "react";

import "./Overlay.scss";

interface IOverlayProps {
  open: boolean;
  onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
  opacity?: number;
}

interface IOverlayState {
  open: boolean;
}

@autobind
class Overlay extends React.Component<IOverlayProps, IOverlayState> {
  public static defaultProps: IOverlayProps = {
    opacity: 1,
    open: false
  };

  public state: IOverlayState = {
    open: this.props.open
  };

  public componentWillReceiveProps(nextProps: IOverlayProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open });
    }
  }

  public render(): JSX.Element {
    const { opacity } = this.props;

    return (
      <div className="overlay" onClick={this.onClick} style={{ opacity }} />
    );
  }

  private onClick(e: React.MouseEvent<HTMLDivElement>) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
}

export default Overlay;
