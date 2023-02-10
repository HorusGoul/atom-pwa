import * as React from "react";
import classNames from "classnames";

import { Element } from "@/Element";
import { useElements } from "@/hooks/useElements";
import "./PtElement.scss";
import styles from "./PtElementSetting.module.scss";
import { useLocale } from "@/hooks/useLocale";

export interface PtElementSettingProp {
  element: Element;
  enabled?: boolean;
  onClick?: (element: Element) => void;
}

function PtElementSetting({ element, enabled, onClick }: PtElementSettingProp) {
  const { getElementLocales } = useElements();
  const elementLocales = getElementLocales(element);
  const { i18n } = useLocale();

  const onElementButtonClick = () => {
    if (onClick) {
      onClick(element);
    }
  };

  const label = `${element.atomic}. ${elementLocales.name}`;

  return (
    <div
      onClick={onElementButtonClick}
      className={classNames("pt-element", "element", element.group, {
        [styles.disabled]: !enabled,
      })}
      role="checkbox"
      aria-checked={enabled}
      onKeyDown={(event) => {
        if (event.key === "Space") {
          onElementButtonClick();
        }
      }}
      aria-label={label}
    >
      <span className="visually-hidden">
        <dl>
          <dt>{i18n("element_data_symbol")}</dt>
          <dd>{element.symbol}</dd>
          <dt>{i18n("element_data_group")}</dt>
          <dd>{elementLocales.group}</dd>
        </dl>
      </span>

      <div className="pt-element__atomic" aria-hidden={true}>
        {element.atomic}
      </div>

      <div className="pt-element__symbol" aria-hidden={true}>
        {element.symbol}
      </div>

      <div className="pt-element__name" aria-hidden={true}>
        {elementLocales.name}
      </div>
    </div>
  );
}

export default PtElementSetting;
