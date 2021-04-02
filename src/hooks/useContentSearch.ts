import { SearchResult as MiniSearchResult } from "minisearch";
import { useMemo } from "react";
import { useElements } from "./useElements";

export type SearchResult = MiniSearchResult;

export function useContentSearch(query: string) {
  const { searchIndex: elementsIndex } = useElements();

  const elements = useMemo(() => {
    return elementsIndex.search(query);
  }, [elementsIndex, query]);

  return { elements };
}
