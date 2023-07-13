import * as React from "react";
import classNames from "classnames";
import Button from "../shared/button/Button";
import { useLocale } from "@/hooks/useLocale";
import { useElements } from "@/hooks/useElements";

interface CalculatorElementProps {
  atomic: number;
  quantity: number;
  selectElement: (atomic: number) => void;
}

function CalculatorElement({
  atomic,
  quantity,
  selectElement,
}: CalculatorElementProps) {
  const { i18n } = useLocale();
  const { getLocalizedElement, getElement } = useElements();

  const element = getElement(atomic);
  const localizedElement = getLocalizedElement(atomic);

  if (!element || !localizedElement) {
    return null;
  }

  return (
    <Button
      onClick={() => selectElement(atomic)}
      className="mass-calculator__element"
    >
      <div
        className={classNames(
          "mass-calculator__element__symbol",
          "element",
          element.group
        )}
      >
        {element.symbol}
      </div>

      <div className="mass-calculator__element__desc">
        <span className="mass-calculator__element__name">
          {localizedElement.name}
        </span>

        <span className="mass-calculator__element__group">
          {element.atomicMass} {i18n("g_mol")}
        </span>
      </div>

      <div className="mass-calculator__element__quantity">
        <span className="mass-calculator__element__quantity__text">
          {i18n("amount")}
        </span>

        <span className="mass-calculator__element__quantity__number">
          {quantity}
        </span>
      </div>
    </Button>
  );
}

export default CalculatorElement;
