import classNames from "classnames";
import * as React from "react";

import "./Card.scss";

interface ICardProps extends React.Props<any> {
  className?: string;
}

class Card extends React.Component<ICardProps> {
  public render() {
    const { className, children } = this.props;

    const cardClass = classNames("card", className);

    return <div className={cardClass}>{children}</div>;
  }
}

export default Card;
