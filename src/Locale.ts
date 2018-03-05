class Locale {
  private currentLocales: {
    [key: string]: string;
  };

  public setLocale(localeFilename: string) {
    this.currentLocales = require(`./locales/${localeFilename}.json`);
  }

  public getString(localeName: string) {
    return this.currentLocales[localeName];
  }

  public getBrowserLocale() {
    const lang = window.navigator.language || "en";
    return lang.slice(0, 2);
  }
}

export default new Locale();

export const i18n = (localeName: string) =>
  module.exports.default.getString(localeName);
