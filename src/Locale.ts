interface ILocale {
  [key: string]: string;
}

class Locale {
  private common: ILocale = require("./locales/common.json");
  private currentLocales: ILocale;

  public setLocale(localeFilename: string) {
    this.currentLocales = require(`./locales/${localeFilename}.json`);
  }

  public getString(localeName: string) {
    return this.currentLocales[localeName] || this.common[localeName];
  }

  public getBrowserLocale() {
    const lang = window.navigator.language || "en";
    return lang.slice(0, 2);
  }
}

export default new Locale();

export const i18n = (localeName: string) =>
  module.exports.default.getString(localeName);
