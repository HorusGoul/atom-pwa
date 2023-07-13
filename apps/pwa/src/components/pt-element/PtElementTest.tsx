import * as React from "react";
import classNames from "classnames";
import { useElements } from "@/hooks/useElements";
import Icon from "../shared/icon/Icon";
import "./PtElement.scss";
import { PtElementInfoProps } from "./PtElementInfo";

export interface PtElementTestProps extends PtElementInfoProps {
  discovered: boolean;
  shouldShowError: boolean;
}

function PtElementTest({
  element,
  discovered,
  onClick,
  shouldShowError,
}: PtElementTestProps) {
  const [showError, setShowError] = React.useState(false);
  const { getElementLocales } = useElements();

  const elementLocales = getElementLocales(element);

  const onElementButtonClick = () => {
    if (onClick && !discovered) {
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

  const label = discovered
    ? `${element.atomic}. ${elementLocales.name}`
    : `${element.atomic}. ?`;

  return (
    <div
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Space") {
          onElementButtonClick();
        }
      }}
      onClick={onElementButtonClick}
      className={classNames("pt-element", "element", {
        [element.group]: discovered,
        clear: !discovered,
        "pt-element--error": showError,
      })}
      aria-disabled={discovered}
      aria-label={label}
    >
      <div className="pt-element__atomic" aria-hidden={true}>
        {element.atomic}
      </div>

      <div className="pt-element__symbol" aria-hidden={true}>
        {discovered ? element.symbol : "?"}
      </div>
      <div className="pt-element__name" aria-hidden={true}>
        {discovered ? elementLocales.name : "???"}
      </div>

      {showError && (
        <div className="pt-element__error" role="alert">
          <Icon name="close" aria-hidden={true} />

          <div>Oops!</div>
        </div>
      )}
    </div>
  );
}

export default PtElementTest;
