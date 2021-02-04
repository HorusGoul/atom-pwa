import { IElement } from "./Element";
import { i18n } from "./Locale";
const elementsMap = import.meta.globEager("./data/elements/*.json");

class ElementManager {
  private elements!: IElement[];

  public loadElements() {
    this.elements = Object.values(elementsMap) as IElement[];
  }

  public getElements(): IElement[] {
    return this.elements;
  }

  public getElement(atomic: number) {
    return this.elements.find((element) => element.atomic === atomic);
  }
}

export default new ElementManager();

export const getElementLocales = (element: IElement) => ({
  bondingType: element.bondingType && i18n(`bonding_${element.bondingType}`),
  group: i18n(`group_${element.group}`),
  name: i18n(`element_name_${element.name.toLowerCase()}`),
  standardState:
    element.standardState && i18n(`standard_state_${element.standardState}`),
});
