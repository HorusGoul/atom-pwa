import hub from "@/data/hub/hub.json";
import { useLocale } from "@/hooks/useLocale";
import { useMemo } from "react";

export interface HubSectionData {
  title: string;
  items: {
    item: string;
    colSpan?: 1 | 2;
    rowSpan?: 1 | 2;
  }[];
}

export interface HubData {
  sections: HubSectionData[];
}

export function useHub(): HubData {
  const { i18n } = useLocale();

  const sections = useMemo(() => {
    return hub.sections.map((section) => {
      return {
        ...section,
        title: i18n(section.title),
      };
    }) as HubSectionData[];
  }, [i18n]);

  return { sections };
}
