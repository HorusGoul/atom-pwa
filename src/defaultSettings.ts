import { ISettings } from "./AppSettings";
import Locale from "./Locale";
import { DEFAULT_THEME } from "./Theme";

const defaultSettings: ISettings = {
  locale: Locale.getBrowserLocale(),
  tests: {
    periodicTable: {
      elements: null
    },
    valences: {
      elements: null
    }
  },
  theme: DEFAULT_THEME
};

export default defaultSettings;
