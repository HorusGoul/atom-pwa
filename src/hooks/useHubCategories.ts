import { useMemo } from "react";
import { useLocale } from "./useLocale";

export interface HubCategoryData {
  id: string;
  title: string;
}

const categoriesMap = import.meta.globEager(
  "../data/hub/categories/*.json"
) as Record<string, HubCategoryData>;

const categories = Object.values(categoriesMap);

const categoryLookup = categories.reduce((prev, next) => {
  prev[next.id] = next;

  return prev;
}, {} as Record<string, HubCategoryData>);

export function useHubCategories() {
  const { i18n } = useLocale();

  const hubItems = useMemo(() => {
    return categories.map((item) => ({
      ...item,
      title: i18n(item.title),
    }));
  }, [i18n]);

  return {
    hubItems,
  };
}

export function useHubCategoryById(id: string) {
  const { i18n } = useLocale();

  const hubItem = useMemo(() => {
    const item = categoryLookup[id];

    return {
      ...item,
      title: i18n(item.title),
    };
  }, [id, i18n]);

  return hubItem;
}
