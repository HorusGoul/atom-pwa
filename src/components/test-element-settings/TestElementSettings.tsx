import classNames from "classnames";
import * as React from "react";
import { ElementSettings } from "@/hooks/useSettings";
import { useElements } from "@/hooks/useElements";
import Button from "../shared/button/Button";
import Checkbox from "../shared/checkbox/Checkbox";
import "./TestElementSettings.scss";

interface TestElementSettingsProps {
  setting: ElementSettings;
  onClick?: (atomic: number) => void;
}

function TestElementSettings({ setting, onClick }: TestElementSettingsProps) {
  const { getLocalizedElement, getElement } = useElements();

  const localizedElement = getLocalizedElement(setting.atomic);
  const element = getElement(setting.atomic);

  if (!element || !localizedElement) {
    return null;
  }

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
          {element.atomic}. {localizedElement.name}
        </span>

        <span className="element-selector__group">
          {localizedElement.group}
        </span>
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
