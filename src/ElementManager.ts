class ElementManager {
  private elements: any[];

  public loadElements() {
    this.elements = require("./data/elements.json");
  }

  public getElements(): any[] {
    return this.elements;
  }
}

export default new ElementManager();
