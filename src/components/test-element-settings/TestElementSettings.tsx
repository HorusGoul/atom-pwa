import autobind from "autobind-decorator";
import classNames from "classnames";
import * as React from "react";
import { ITestElementSettings } from "../../AppSettings";
import ElementManager, { getElementLocales } from "../../ElementManager";
import { i18n } from "../../Locale";
import Button from "../shared/button/Button";
import Checkbox from "../shared/checkbox/Checkbox";
import "./TestElementSettings.scss";

interface ITestElementSettingsProps {
  setting: ITestElementSettings;
  onClick?: (atomic: number) => void;
}

@autobind
class TestElementSettings extends React.Component<
  ITestElementSettingsProps,
  {}
> {
  public render() {
    const { setting } = this.props;
    const element = ElementManager.getElement(setting.atomic);
    const elementLocales = getElementLocales(element);

    return (
      <Button
        onClick={this.onClick}
        key={element.atomic}
        className="element-selector"
      >
        <div
          className={classNames("element-selector__symbol", "element", {
            [element.group]: setting.enabled,
            clear: !setting.enabled
          })}
        >
          {element.symbol}
        </div>

        <div className="element-selector__desc">
          <span className="element-selector__name">
            {element.atomic}. {elementLocales.name}
          </span>

          <span className="element-selector__group">
            {elementLocales.group}
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

  private onClick() {
    const { atomic } = this.props.setting;

    if (this.props.onClick) {
      this.props.onClick(atomic);
    }
  }
}

export default TestElementSettings;
