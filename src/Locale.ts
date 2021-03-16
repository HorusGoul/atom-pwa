import invariant from "invariant";
import NativeBridge from "./NativeBridge";
import localePercentages from "./locales/percentages.json";

type LocaleChangeListener = () => void;

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = Object.entries(localePercentages)
  .filter(([, percentage]) => percentage >= 85)
  .map(([locale]) => locale);

const localesMap = import.meta.globEager("./locales/*.json");
const getLocaleKey = (locale: string) => `./locales/${locale}.json`;

class Locale {
  private common: Record<string, string> = localesMap[getLocaleKey("common")];
  private currentLang!: string;
  private currentLocales!: Record<string, string>;
  private defaultLocales: Record<string, string> =
    localesMap[getLocaleKey(DEFAULT_LOCALE)];
  private localeChangeListeners: LocaleChangeListener[] = [];

  public setLocale(lang: string) {
    lang = lang.replace("-", "_");

    if (SUPPORTED_LOCALES.includes(lang)) {
      lang = lang;
    } else if (SUPPORTED_LOCALES.includes(lang.slice(0, 2))) {
      lang = lang.slice(0, 2);
    } else {
      lang = DEFAULT_LOCALE;
    }

    this.currentLang = lang;
    this.currentLocales = localesMap[getLocaleKey(lang)];

    this.localeChangeListeners.forEach((listener) => listener());
  }

  public getString(localeName: string) {
    const result =
      this.currentLocales?.[localeName] ||
      this.defaultLocales[localeName] ||
      this.common[localeName];

    invariant(
      result,
      `[Locale] The string name "${localeName}" doesn't have a value.`
    );

    return result;
  }

  public getBrowserLocale() {
    const lang = NativeBridge.getSystemLanguage() || DEFAULT_LOCALE;
    return lang;
  }

  public getCurrentLang() {
    return this.currentLang;
  }

  public addLocaleChangeListener(listener: LocaleChangeListener) {
    this.localeChangeListeners.push(listener);
  }

  public removeLocaleChangeListener(listener: LocaleChangeListener) {
    this.localeChangeListeners = this.localeChangeListeners.filter(
      (currentListener) => currentListener !== listener
    );
  }
}

const locale = new Locale();

export default locale;

export const i18n = (localeName: string): string =>
  locale.getString(localeName);
