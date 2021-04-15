import { useMemo } from "react";
import { useLocale } from "./useLocale";

export interface HubItemData {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  href: string;
  disabled?: boolean;
}

const itemsMap = import.meta.globEager("../data/hub/items/*.json") as Record<
  string,
  HubItemData
>;

const items = Object.values(itemsMap);

const itemLookup = items.reduce((prev, next) => {
  prev[next.id] = next;

  return prev;
}, {} as Record<string, HubItemData>);

export function useHubItems() {
  const { i18n } = useLocale();

  const hubItems = useMemo(() => {
    return items.map((item) => ({
      ...item,
      title: i18n(item.title),
    }));
  }, [i18n]);

  return {
    hubItems,
  };
}

export function useHubItemById(id: string) {
  const { i18n } = useLocale();

  const hubItem = useMemo(() => {
    const item = itemLookup[id];

    return {
      ...item,
      title: i18n(item.title),
    };
  }, [id, i18n]);

  return hubItem;
}
