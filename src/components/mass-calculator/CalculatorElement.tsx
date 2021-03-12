import * as React from "react";
import classNames from "classnames";
import Button from "../shared/button/Button";
import { i18n } from "../../Locale";
import ElementManager, { getElementLocales } from "../../ElementManager";

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
  const element = ElementManager.getElement(atomic);

  if (!element) {
    return null;
  }

  const elementLocales = getElementLocales(element);

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
          {elementLocales.name}
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
