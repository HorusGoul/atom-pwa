import MiniSearch from "minisearch";
import { Element } from "@/Element";
import { useLocale } from "@/hooks/useLocale";
import * as React from "react";

const elementsMap = import.meta.globEager("../data/elements/*.json") as Record<
  string,
  Element
>;

const elements = Object.values(elementsMap).sort(
  (elementA, elementB) => elementA.atomic - elementB.atomic
);

const elementLookup = elements.reduce((prev, next) => {
  prev[next.atomic] = next;

  return prev;
}, {} as Record<number, Element>);

function useElementContextLogic() {
  const { i18n } = useLocale();

  const getElement: (atomic: number) => Element = React.useCallback(
    (atomic: number) => elementLookup[atomic],
    []
  );

  const localizedElementsMap = React.useMemo(() => {
    return elements
      .map((element) => {
        return [
          element.atomic,
          {
            ...element,
            bondingType:
              element.bondingType && i18n(`bonding_${element.bondingType}`),
            group: i18n(`group_${element.group}`),
            name: i18n(`element_name_${element.name.toLowerCase()}`),
            standardState:
              element.standardState &&
              i18n(`standard_state_${element.standardState}`),
          },
        ] as const;
      })
      .reduce((prev, [atomic, element]) => {
        prev[atomic] = element;

        return prev;
      }, {} as Record<number, Element>);
  }, [i18n]);

  const getElementLocales = React.useCallback(
    (element: Element): Element => {
      return localizedElementsMap[element.atomic];
    },
    [localizedElementsMap]
  );

  const getLocalizedElement = React.useCallback(
    (atomic: number) => {
      const element = getElement(atomic);
      return getElementLocales(element);
    },
    [getElement, getElementLocales]
  );

  const localizedElements = React.useMemo(() => {
    return elements.map(getElementLocales);
  }, [getElementLocales]);

  const searchIndexRef = React.useRef<MiniSearch<Element>>();

  if (!searchIndexRef.current) {
    searchIndexRef.current = new MiniSearch<Element>({
      idField: "atomic",
      fields: [
        "atomic",
        "symbol",
        "name",
        "atomicMass",
        "group",
        "standardState",
        "bondingType",
        "electronicConfiguration",
      ],
      searchOptions: {
        fuzzy: 0.5,
        boost: {
          atomic: 5,
          symbol: 5,
          name: 2,
          group: 2,
        },
        prefix: true,
      },
    });

    searchIndexRef.current.addAll(localizedElements);
  }

  return {
    elements,
    getElement,
    getElementLocales,
    getLocalizedElement,
    searchIndex: searchIndexRef.current as MiniSearch<Element>,
  };
}

export type ElementContextValue = ReturnType<typeof useElementContextLogic>;

export const ElementContext = React.createContext<ElementContextValue>(
  {} as ElementContextValue
);

export function ElementProvider({ children }: { children: React.ReactNode }) {
  const value = useElementContextLogic();

  return (
    <ElementContext.Provider value={value}>{children}</ElementContext.Provider>
  );
}
