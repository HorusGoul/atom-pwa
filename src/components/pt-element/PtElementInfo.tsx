import * as React from "react";
import classNames from "classnames";

import { Element } from "@/Element";
import { useElements } from "@/hooks/useElements";
import Button from "../shared/button/Button";
import "./PtElement.scss";

export interface PtElementInfoProps {
  element: Element;
  onClick?: (element: Element) => void;
}

function PtElementInfo({ element, onClick }: PtElementInfoProps) {
  const { getElementLocales } = useElements();
  const elementLocales = getElementLocales(element);

  const onElementButtonClick = () => {
    if (onClick) {
      onClick(element);
    }
  };

  return (
    <Button
      onClick={onElementButtonClick}
      className={classNames("pt-element", "element", element.group)}
    >
      <div className="pt-element__atomic">{element.atomic}</div>

      <div className="pt-element__symbol">{element.symbol}</div>

      <div className="pt-element__name">{elementLocales.name}</div>
    </Button>
  );
}

export default PtElementInfo;
