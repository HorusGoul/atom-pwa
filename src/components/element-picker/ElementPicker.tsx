import classNames from "classnames";
import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { VirtualScroller, useVirtualScroller } from "react-hyper-scroller";
import { IElement } from "../../Element";
import ElementManager, { getElementLocales } from "../../ElementManager";
import { i18n } from "../../Locale";
import Button from "../shared/button/Button";
import Icon from "../shared/icon/Icon";
import "./ElementPicker.scss";

interface ElementPickerProps {
  onElement: (element: IElement) => void;
}

function ElementPicker({ onElement }: ElementPickerProps) {
  const [elements, setElements] = useState<IElement[]>([]);
  const elementListRef = useRef<HTMLDivElement>(null);

  const elementListRowRenderer = useCallback(
    (index: number, ref: React.RefObject<HTMLDivElement>) => {
      const element = elements[index];
      const elementLocales = getElementLocales(element);

      return (
        <div key={element.atomic} ref={ref}>
          <Button
            onClick={() => onElement(element)}
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
    },
    [elements]
  );

  const searchElements = useCallback((searchValue?: string) => {
    const elements = ElementManager.getElements();

    if (!searchValue) {
      return setElements(elements);
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

    setElements(newElements);
  }, []);

  useEffect(() => {
    searchElements();
  }, [searchElements]);

  const scroller = useVirtualScroller({
    estimatedItemHeight: 64,
    targetView: elementListRef,
    itemCount: elements.length,
  });

  return (
    <div className="element-picker">
      <div className="element-picker__search-bar">
        <Icon name="search" />

        <input
          className="element-picker__search-bar__input"
          type="text"
          placeholder={i18n("search_elements")}
          onChange={(event) => {
            const value = event.currentTarget.value.toLowerCase();

            searchElements(value);
          }}
          autoFocus={true}
        />
      </div>

      <div ref={elementListRef} className="element-picker__element-list">
        <VirtualScroller {...scroller} itemRenderer={elementListRowRenderer} />
      </div>
    </div>
  );
}

export default ElementPicker;
