import { useCallback } from "react";
import { produce } from "immer";
import { useLocalStorage } from "./useLocalStorage";
import { Settings } from "../AppSettings";
import { getBrowserLocale } from "./useLocale";
import { DEFAULT_THEME } from "./useTheme";

export const STORAGE_KEY = "atom:settings";

export const defaultSettings: Settings = {
  locale: getBrowserLocale(),
  tests: {
    periodicTable: {
      elements: null,
    },
    valences: {
      elements: null,
    },
  },
  theme: DEFAULT_THEME,
};

export function useAppSettings() {
  const [settings, setSettings] = useLocalStorage(STORAGE_KEY, defaultSettings);

  const updateSettings = useCallback(
    (updateFunction: (settings: Settings) => void) => {
      const newSettings = produce(settings, updateFunction);
      if (newSettings !== settings) {
        setSettings(newSettings);
      }
    },
    [settings, setSettings]
  );

  return { settings, updateSettings };
}
