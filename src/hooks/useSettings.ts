import { useCallback } from "react";
import { produce } from "immer";
import { useLocalStorage } from "./useLocalStorage";
import { DEFAULT_THEME } from "./useTheme";
import { getBrowserLocale } from "@/services/locale/getBrowserLocale";

export interface ElementSettings {
  atomic: number;
  enabled: boolean;
  stats: {
    times: number;
    right: number;
    wrong: number;
  };
}

export interface ElementsSettings {
  elements: ElementSettings[] | null;
}

export interface Settings {
  [key: string]: unknown;
  theme: string;
  locale: string;
  tests: {
    valences: ElementsSettings;
    periodicTable: ElementsSettings;
  };
}

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

export function useSettings() {
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
