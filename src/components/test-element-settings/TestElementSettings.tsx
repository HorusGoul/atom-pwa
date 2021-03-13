import classNames from "classnames";
import * as React from "react";
import { ITestElementSettings } from "../../AppSettings";
import ElementManager, { getElementLocales } from "../../ElementManager";
import Button from "../shared/button/Button";
import Checkbox from "../shared/checkbox/Checkbox";
import "./TestElementSettings.scss";

interface TestElementSettingsProps {
  setting: ITestElementSettings;
  onClick?: (atomic: number) => void;
}

function TestElementSettings({ setting, onClick }: TestElementSettingsProps) {
  const element = ElementManager.getElement(setting.atomic);

  if (!element) {
    return null;
  }

  const elementLocales = getElementLocales(element);

  return (
    <Button
      onClick={() => onClick?.(element.atomic)}
      key={element.atomic}
      className="element-selector"
    >
      <div
        className={classNames("element-selector__symbol", "element", {
          [element.group]: setting.enabled,
          clear: !setting.enabled,
        })}
      >
        {element.symbol}
      </div>

      <div className="element-selector__desc">
        <span className="element-selector__name">
          {element.atomic}. {elementLocales.name}
        </span>

        <span className="element-selector__group">{elementLocales.group}</span>
      </div>

      <Checkbox
        readOnly={true}
        value={setting.enabled}
        className="element-selector__checkbox"
      />
    </Button>
  );
}

export default TestElementSettings;
