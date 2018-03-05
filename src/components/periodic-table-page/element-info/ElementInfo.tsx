import classNames = require("classnames");
import * as React from "react";
import { IElement } from "../../../Element";
import { getElementLocales } from "../../../ElementManager";
import { i18n } from "../../../Locale";
import "./ElementInfo.scss";

interface IElementInfoDataEntryProps {
  name: string;
  value: any;
}

const ElementInfoDataEntry: React.StatelessComponent<
  IElementInfoDataEntryProps
> = ({ name, value }) => (
  <div className="element-info__data-entry">
    <div className="element-info__data-entry__name">{name}</div>

    <div className="element-info__data-entry__value">{value}</div>
  </div>
);

interface IElementInfoProps {
  element: IElement;
}

class ElementInfo extends React.Component<IElementInfoProps, {}> {
  public render() {
    const { element } = this.props;

    if (!element) {
      return null;
    }

    const elementLocales = getElementLocales(element);

    // TODO: ADD UNITS
    return (
      <div className="element-info">
        <div
          className={classNames(
            "element-info__header",
            "element",
            element.group
          )}
        >
          <div className="element-info__name">{elementLocales.name}</div>
          <div className="element-info__group">{elementLocales.group}</div>
        </div>

        <div className="element-info__data-list">
          <ElementInfoDataEntry
            name={i18n("element_data_atomic")}
            value={element.atomic}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_symbol")}
            value={element.symbol}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_atomicMass")}
            value={element.atomicMass}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_electronicConfiguration")}
            value={element.electronicConfiguration}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_electronegativity")}
            value={element.electronegativity}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_atomicRadius")}
            value={element.atomicRadius}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_ionRadius")}
            value={element.ionRadius}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_vanDelWaalsRadius")}
            value={element.vanDelWaalsRadius}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_ionizationEnergy")}
            value={element.ionizationEnergy}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_electronAffinity")}
            value={element.electronAffinity}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_oxidationState")}
            value={element.oxidationStates}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_standardState")}
            value={elementLocales.standardState}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_bondingType")}
            value={elementLocales.bondingType}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_meltingPoint")}
            value={element.meltingPoint}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_boilingPoint")}
            value={element.boilingPoint}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_density")}
            value={element.density}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_yearDiscovered")}
            value={element.yearDiscovered}
          />
          <ElementInfoDataEntry
            name={i18n("element_data_valency")}
            value={element.valency}
          />
        </div>
      </div>
    );
  }
}

export default ElementInfo;
