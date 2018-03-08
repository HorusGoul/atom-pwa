export const DEFAULT_THEME = "dark";
export const THEMES_LIST = ["dark", "light", "black"];

type ThemeChangeListener = (theme: string) => void;

class Theme {
  private currentTheme: string;
  private themeChangeListeners: ThemeChangeListener[] = [];

  public getCurrentTheme() {
    return this.currentTheme;
  }

  public setTheme(theme: string) {
    this.currentTheme = theme;

    this.themeChangeListeners.forEach(listener => listener(theme));
  }

  public addThemeChangeListener(listener: ThemeChangeListener) {
    this.themeChangeListeners.push(listener);
  }

  public removeThemeChangeListener(listener: ThemeChangeListener) {
    this.themeChangeListeners = this.themeChangeListeners.filter(
      currentListener => currentListener !== listener
    );
  }
}

export default new Theme();
