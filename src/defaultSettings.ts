import { Settings } from "./AppSettings";
import { getBrowserLocale } from "./hooks/useLocale";
import { DEFAULT_THEME } from "./Theme";

const defaultSettings: Settings = {
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

export default defaultSettings;
