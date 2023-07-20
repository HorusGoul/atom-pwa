import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { useQuery } from "@/hooks/useQuery";

export function useSearchInput(type: "push" | "replace") {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const query = useQuery();
  const value = query.get("search") ?? "";

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = encodeURIComponent(event.target.value);

      navigate(
        { search: query ? `search=${query}` : "openSearch=true" },
        {
          replace: type === "replace",
        }
      );
    },
    [type, navigate]
  );

  return {
    value,
    onChange,
    placeholder: i18n("Search_dots"),
    "aria-label": i18n("Search"),
  };
}
