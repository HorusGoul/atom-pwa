import { ISettings } from "./AppSettings";
import Locale from "./Locale";

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
  theme: "light"
};

export default defaultSettings;
