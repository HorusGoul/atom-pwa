import { logEvent } from "@/services/spycat";
import { SearchResult as MiniSearchResult } from "minisearch";
import { useEffect, useMemo } from "react";
import { useElements } from "./useElements";

export type SearchResult = MiniSearchResult;

export function useContentSearch(query: string) {
  const { searchIndex: elementsIndex } = useElements();

  const elements = useMemo(() => {
    return elementsIndex.search(query, {
      fuzzy: 0.5,
      prefix: true,
    });
  }, [elementsIndex, query]);

  useEffect(() => {
    if (query) {
      logEvent("search", {
        search_query: query,
      });
    }
  }, [query]);

  return { elements };
}
