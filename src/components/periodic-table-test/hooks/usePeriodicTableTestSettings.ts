import { useTestSettings } from "@/hooks/useTestSettings";

export function usePeriodicTableTestSettings() {
  return useTestSettings("periodicTable", "ptTest");
}
