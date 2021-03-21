import { useTestSettings } from "@/hooks/useTestSettings";

export function useValencesTestSettings() {
  return useTestSettings("valences", "valencesTest");
}
