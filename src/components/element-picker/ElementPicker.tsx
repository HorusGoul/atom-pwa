import classNames from "classnames";
import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import HyperScroller, {
  HyperScrollerCache,
  useHyperScrollerController,
} from "react-hyper-scroller";
import { Element } from "@/Element";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import Button from "../shared/button/Button";
import Icon from "../shared/icon/Icon";
import "./ElementPicker.scss";

interface ElementPickerProps {
  onElement: (element: Element) => void;
}

interface SearchState {
  query: string;
  elements: Element[];
}

function ElementPicker({ onElement }: ElementPickerProps) {
  const { i18n } = useLocale();
  const { elements: allElements, getElementLocales } = useElements();
  const [search, setSearch] = useState<SearchState>(() => ({
    query: "",
    elements: allElements,
  }));

  const searchElements = useCallback(
    (searchValue?: string) => {
      if (!searchValue) {
        return setSearch({ query: "", elements: allElements });
      }

      const newElements = allElements.filter((element) => {
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

      setSearch({ query: searchValue, elements: newElements });
    },
    [allElements, getElementLocales]
  );

  useEffect(() => {
    searchElements();
  }, [searchElements]);

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

      <SearchResultList search={search} onElement={onElement} />
    </div>
  );
}

export default ElementPicker;

interface SearchResultListProps {
  search: SearchState;
  onElement: (element: Element) => void;
}

function SearchResultList({ search, onElement }: SearchResultListProps) {
  const { getElementLocales } = useElements();

  const elementListRef = useRef<HTMLDivElement>(null);

  const controller = useHyperScrollerController({
    estimatedItemHeight: 64,
    targetView: elementListRef,
    cache: HyperScrollerCache.getOrCreateCache(
      `element-picker:${search.query}`
    ),
    measureItems: false,
  });

  return (
    <div ref={elementListRef} className="element-picker__element-list">
      <HyperScroller controller={controller}>
        {search.elements.map((element) => {
          const elementLocales = getElementLocales(element);

          return (
            <Button
              key={element.atomic}
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
          );
        })}
      </HyperScroller>
    </div>
  );
}
