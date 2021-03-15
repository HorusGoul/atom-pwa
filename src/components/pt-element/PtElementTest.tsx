import * as React from "react";
import classNames from "classnames";

import { getElementLocales } from "../../ElementManager";
import Button from "../shared/button/Button";
import Icon from "../shared/icon/Icon";
import "./PtElement.scss";
import { PtElementInfoProps } from "./PtElementInfo";

export interface IPtElementTestProps extends PtElementInfoProps {
  discovered: boolean;
  shouldShowError: boolean;
}

function PtElementTest({
  element,
  discovered,
  onClick,
  shouldShowError,
}: IPtElementTestProps) {
  const [showError, setShowError] = React.useState(false);
  const elementLocales = getElementLocales(element);

  const onElementButtonClick = () => {
    if (onClick) {
      onClick(element);
      shouldShowError && setShowError(true);
    }
  };

  React.useEffect(() => {
    let hideError: number | undefined;
    if (showError) {
      hideError = window.setTimeout(() => {
        setShowError(false);
      }, 1000);
    }
    return () => {
      hideError && window.clearTimeout(hideError);
    };
  }, [showError]);

  return (
    <Button
      onClick={onElementButtonClick}
      className={classNames("pt-element", "element", {
        [element.group]: discovered,
        clear: !discovered,
        "pt-element--error": showError,
      })}
    >
      <div className="pt-element__atomic">{element.atomic}</div>

      <div className="pt-element__symbol">
        {discovered ? element.symbol : "?"}
      </div>
      <div className="pt-element__name">
        {discovered ? elementLocales.name : "???"}
      </div>

      <div className="pt-element__error">
        <Icon name="close" />

        <div>Oops!</div>
      </div>
    </Button>
  );
}

export default PtElementTest;
