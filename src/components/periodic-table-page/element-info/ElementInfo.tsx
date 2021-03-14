import classNames from "classnames";
import * as React from "react";
import { IElement } from "../../../Element";
import { getElementLocales } from "../../../ElementManager";
import { i18n } from "../../../Locale";
import "./ElementInfo.scss";

interface ElementInfoDataEntryProps {
  name: string;
  value: any;
  unit?: string;
}

const ElementInfoDataEntry = ({
  name,
  value,
  unit,
}: ElementInfoDataEntryProps) => {
  if (!value) {
    return null;
  }

  return (
    <div className="element-info__data-entry">
      <div className="element-info__data-entry__name">{name}</div>

      <div className="element-info__data-entry__value">
        {value}
        {unit ? ` ${unit}` : ""}
      </div>
    </div>
  );
};

interface IElementInfoProps {
  element: IElement;
}

function ElementInfo({ element }: IElementInfoProps) {
  if (!element) {
    return null;
  }

  const elementLocales = getElementLocales(element);

  return (
    <div className="element-info">
      <div
        className={classNames("element-info__header", "element", element.group)}
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
          unit={i18n("g_mol")}
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
          unit={i18n("pm")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_ionRadius")}
          value={element.ionRadius}
          unit={i18n("pm")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_vanDelWaalsRadius")}
          value={element.vanDelWaalsRadius}
          unit={i18n("pm")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_ionizationEnergy")}
          value={element.ionizationEnergy}
          unit={i18n("kJ_mol")}
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
          unit={i18n("kelvin_unit")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_boilingPoint")}
          value={element.boilingPoint}
          unit={i18n("kelvin_unit")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_density")}
          value={element.density}
          unit={i18n("g_cm3")}
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

export default ElementInfo;
