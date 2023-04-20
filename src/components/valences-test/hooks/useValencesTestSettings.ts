import { useTestSettings } from "@/hooks/useTestSettings";
import { useCallback } from "react";

export function useValencesTestSettings() {
  return useTestSettings(
    "valences",
    "valencesTest",
    useCallback(
      (element) => !!element.valency && element.wrongValences.length >= 3,
      []
    )
  );
}
