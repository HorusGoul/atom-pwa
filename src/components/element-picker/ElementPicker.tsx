import autobind from "autobind-decorator";
import classNames from "classnames";
import * as React from "react";
import { VirtualScroller } from "react-hyper-scroller";
import { IElement } from "../../Element";
import ElementManager, { getElementLocales } from "../../ElementManager";
import { i18n } from "../../Locale";
import Button from "../shared/button/Button";
import Icon from "../shared/icon/Icon";
import "./ElementPicker.scss";

interface IElementPickerProps {
  onElement: (element: IElement) => void;
}

interface IElementPickerState {
  elements: IElement[];
}

@autobind
class ElementPicker extends React.Component<
  IElementPickerProps,
  IElementPickerState
> {
  public state: IElementPickerState = {
    elements: [],
  };

  // private listComponent: List;
  private elementListDiv: HTMLDivElement | null = null;

  public componentDidMount() {
    this.searchElements();
  }

  public render() {
    const { elements } = this.state;

    return (
      <div className="element-picker">
        <div className="element-picker__search-bar">
          <Icon name="search" />

          <input
            className="element-picker__search-bar__input"
            type="text"
            placeholder={i18n("search_elements")}
            onChange={this.onSearchInputChange}
            autoFocus={true}
          />
        </div>

        <div
          ref={(ref) => (this.elementListDiv = ref)}
          className="element-picker__element-list"
        >
          <VirtualScroller
            defaultRowHeight={64}
            targetView={this.elementListDiv!}
            rowCount={elements.length}
            rowRenderer={this.elementListRowRenderer}
          />
        </div>
      </div>
    );
  }

  private buildElementClickListener(element: IElement) {
    return () => this.onElementClick(element);
  }

  private onElementClick(element: IElement) {
    this.props.onElement(element);
  }

  private elementListRowRenderer(
    index: number,
    rowRef: (rowRef: React.ReactInstance) => void
  ) {
    const { elements } = this.state;
    const element = elements[index];
    const elementLocales = getElementLocales(element);

    return (
      <div key={element.atomic} ref={(div) => rowRef(div!)}>
        <Button
          onClick={this.buildElementClickListener(element)}
          className="element-picker__element"
        >
          <div
            className={classNames(
              "element-picker__element__symbol",
              "element",
              element.group
            )}
          >
            {element.symbol}
          </div>

          <div className="element-picker__element__desc">
            <span className="element-picker__element__name">
              {elementLocales.name}
            </span>

            <span className="element-picker__element__group">
              {elementLocales.group}
            </span>
          </div>
        </Button>
      </div>
    );
  }

  private onSearchInputChange(event: React.FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value.toLowerCase();

    this.searchElements(value);
  }

  private searchElements(searchValue?: string) {
    const elements = ElementManager.getElements();

    if (!searchValue) {
      return this.setElements(elements);
    }

    const newElements = elements.filter((element) => {
      const elementLocales = getElementLocales(element);
      const symbol = element.symbol.toLowerCase();
      const name = elementLocales.name.toLowerCase();
      const group = elementLocales.group.toLowerCase();

      if (symbol === searchValue) {
        return true;
      }

      if (name.includes(searchValue)) {
        return true;
      }

      if (group.includes(searchValue)) {
        return true;
      }

      if (parseInt(searchValue, 10) === element.atomic) {
        return true;
      }

      return false;
    });

    this.setElements(newElements);
  }

  private setElements(elements: IElement[]) {
    this.setState({
      elements,
    });

    // this.listComponent.forceUpdateGrid();
  }
}

export default ElementPicker;
