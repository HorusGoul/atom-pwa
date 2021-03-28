import { useCallback } from "react";
import { Element } from "../Element";
import { useLocale } from "./useLocale";

const elementsMap = import.meta.globEager("../data/elements/*.json");

const elements = Object.values(elementsMap) as Element[];

const elementLookup = elements.reduce((prev, next) => {
  prev[next.atomic] = next;

  return prev;
}, {} as Record<number, Element>);

export function useElements() {
  const { i18n } = useLocale();

  const getElement: (
    atomic: number | undefined
  ) => Element | undefined = useCallback(
    (atomic) => (atomic ? elementLookup[atomic] : undefined),
    []
  );

  const getElementLocales: (element: Element) => Element = useCallback(
    (element) => {
      return {
        ...element,
        bondingType:
          element.bondingType && i18n(`bonding_${element.bondingType}`),
        group: i18n(`group_${element.group}`),
        name: i18n(`element_name_${element.name.toLowerCase()}`),
        standardState:
          element.standardState &&
          i18n(`standard_state_${element.standardState}`),
      };
    },
    [i18n]
  );

  const getLocalizedElement: (
    atomic: number | undefined
  ) => Element | undefined = useCallback(
    (atomic) => {
      const element = getElement(atomic);
      return element ? getElementLocales(element) : undefined;
    },
    [getElement, getElementLocales]
  );

  return {
    elements,
    getElement,
    getElementLocales,
    getLocalizedElement,
  };
}
