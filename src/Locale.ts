interface ILocale {
  [key: string]: string;
}

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "es"];

class Locale {
  private common: ILocale = require("./locales/common.json");
  private currentLang: string;
  private currentLocales: ILocale;
  private defaultLocales: ILocale = require(`./locales/${DEFAULT_LOCALE}.json`);

  public setLocale(lang: string) {
    if (SUPPORTED_LOCALES.indexOf(lang) === -1) {
      lang = DEFAULT_LOCALE;
    }

    this.currentLang = lang;
    this.currentLocales = require(`./locales/${lang}.json`);
  }

  public getString(localeName: string) {
    return (
      this.currentLocales[localeName] ||
      this.defaultLocales[localeName] ||
      this.common[localeName]
    );
  }

  public getBrowserLocale() {
    const lang = window.navigator.language || DEFAULT_LOCALE;
    return lang.slice(0, 2);
  }

  public getCurrentLang() {
    return this.currentLang;
  }
}

export default new Locale();

export const i18n = (localeName: string) =>
  module.exports.default.getString(localeName);
