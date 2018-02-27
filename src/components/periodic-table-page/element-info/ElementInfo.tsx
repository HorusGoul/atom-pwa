import classNames = require("classnames");
import * as React from "react";
import { IElement } from "../../../Element";
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

    return (
      <div className="element-info">
        <div
          className={classNames(
            "element-info__header",
            "element",
            element.group
          )}
        >
          <div className="element-info__name">{element.name}</div>
          <div className="element-info__group">{element.group}</div>
        </div>

        <div className="element-info__data-list">
          <ElementInfoDataEntry name="Atomic number" value={element.atomic} />
          <ElementInfoDataEntry name="Symbol" value={element.symbol} />
          <ElementInfoDataEntry name="Mass" value={element.atomicMass} />
          <ElementInfoDataEntry
            name="Electronic C."
            value={element.electronicConfiguration}
          />
          <ElementInfoDataEntry
            name="Electronegativity"
            value={element.electronegativity}
          />
          <ElementInfoDataEntry
            name="Atomic radius"
            value={element.atomicRadius}
          />
          <ElementInfoDataEntry name="Ionic radius" value={element.ionRadius} />
          <ElementInfoDataEntry
            name="Van der Waals radius"
            value={element.vanDelWaalsRadius}
          />
          <ElementInfoDataEntry
            name="Ionization energy"
            value={element.ionizationEnergy}
          />
          <ElementInfoDataEntry
            name="Electron affinity"
            value={element.electronAffinity}
          />
          <ElementInfoDataEntry
            name="Oxidation states"
            value={element.oxidationStates}
          />
          <ElementInfoDataEntry
            name="Standard status"
            value={element.standardState}
          />
          <ElementInfoDataEntry
            name="Bonding type"
            value={element.bondingType}
          />
          <ElementInfoDataEntry
            name="Melting point"
            value={element.meltingPoint}
          />
          <ElementInfoDataEntry
            name="Boiling point"
            value={element.boilingPoint}
          />
          <ElementInfoDataEntry name="Density" value={element.density} />
          <ElementInfoDataEntry
            name="Year discovered"
            value={element.yearDiscovered}
          />
          <ElementInfoDataEntry name="Valency" value={element.valency} />
        </div>
      </div>
    );
  }
}

export default ElementInfo;
