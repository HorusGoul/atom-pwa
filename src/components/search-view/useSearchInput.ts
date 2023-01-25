import * as React from "react";
import { useHistory } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { useQuery } from "@/hooks/useQuery";

export function useSearchInput(type: "push" | "replace") {
  const { i18n } = useLocale();
  const history = useHistory();
  const query = useQuery();
  const value = query.get("search") ?? "";

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = encodeURIComponent(event.target.value);

      history[type]({ search: query ? `search=${query}` : "" });
    },
    [type, history]
  );

  return {
    value,
    onChange,
    placeholder: i18n("Search_dots"),
    "aria-label": i18n("Search"),
  };
}
