import NativeBridge from "./NativeBridge";

interface ILocale {
  [key: string]: string;
}

type LocaleChangeListener = () => void;

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "es", "de", "ro"];

import commonJSON from './locales/common.json';
import enJSON from  './locales/en.json';
import esJSON from './locales/es.json';
import deJSON from  './locales/de.json';
import roJSON from './locales/ro.json';

const locales = {
  en: enJSON,
  es: esJSON,
  de: deJSON,
  ro: roJSON,
}

class Locale {
  private common: ILocale = commonJSON;
  private currentLang: string;
  private currentLocales: ILocale;
  private defaultLocales: ILocale = locales[DEFAULT_LOCALE];
  private localeChangeListeners: LocaleChangeListener[] = [];

  public setLocale(lang: string) {
    if (SUPPORTED_LOCALES.indexOf(lang) === -1) {
      lang = DEFAULT_LOCALE;
    }

    this.currentLang = lang;
    this.currentLocales = locales[lang];

    this.localeChangeListeners.forEach(listener => listener());
  }

  public getString(localeName: string) {
    return (
      this.currentLocales[localeName] ||
      this.defaultLocales[localeName] ||
      this.common[localeName]
    );
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
      currentListener => currentListener !== listener
    );
  }
}

const locale = new Locale();

export default locale;

export const i18n = (localeName: string): string =>
  locale.getString(localeName);
