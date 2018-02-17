import { IElement } from "./Element";

class ElementManager {
  private elements: IElement[];

  public loadElements() {
    this.elements = require("./data/elements.json");
  }

  public getElements(): IElement[] {
    return this.elements;
  }

  public getElement(atomic: number) {
    return this.elements.find(element => element.atomic === atomic);
  }
}

export default new ElementManager();
