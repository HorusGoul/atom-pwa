import invariant from "invariant";
import NativeBridge from "./NativeBridge";

interface ILocale {
  [key: string]: string;
}

type LocaleChangeListener = () => void;

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "es", "de", "ro"];

const localesMap = import.meta.globEager("./locales/*.json");
const getLocaleKey = (locale: string) => `./locales/${locale}.json`;

class Locale {
  private common: ILocale = localesMap[getLocaleKey("common")];
  private currentLang!: string;
  private currentLocales!: ILocale;
  private defaultLocales: ILocale = localesMap[getLocaleKey(DEFAULT_LOCALE)];
  private localeChangeListeners: LocaleChangeListener[] = [];

  public setLocale(lang: string) {
    if (SUPPORTED_LOCALES.indexOf(lang) === -1) {
      lang = DEFAULT_LOCALE;
    }

    this.currentLang = lang;
    this.currentLocales = localesMap[getLocaleKey(lang)];

    this.localeChangeListeners.forEach((listener) => listener());
  }

  public getString(localeName: string) {
    const result =
      this.currentLocales[localeName] ||
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
    return lang.slice(0, 2);
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
