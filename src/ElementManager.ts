import { IElement } from "./Element";

class ElementManager {
  private elements: IElement[];

  public loadElements() {
    this.elements = require("./data/elements.json");
  }

  public getElements(): IElement[] {
    return this.elements;
  }
}

export default new ElementManager();
