import classNames from "classnames";
import * as React from "react";
import "./Card.scss";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

function Card({ className, children }: CardProps) {
  return <div className={classNames("card", className)}>{children}</div>;
}

export default Card;
