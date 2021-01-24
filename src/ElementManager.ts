import { IElement } from "./Element";
import Locale, { i18n } from "./Locale";
import elements from './data/elements.json';

class ElementManager {
  private elements: IElement[];

  public loadElements() {
    this.elements = elements;
  }

  public getElements(): IElement[] {
    return this.elements;
  }

  public getElement(atomic: number) {
    return this.elements.find(element => element.atomic === atomic);
  }
}

export default new ElementManager();

export const getElementLocales = (element: IElement) => ({
  bondingType: i18n(`bonding_${element.bondingType}`),
  group: i18n(`group_${element.group}`),
  name: i18n(`element_name_${element.name.toLowerCase()}`),
  standardState: i18n(`standard_state_${element.standardState}`)
});
