import defaultSettings from "./defaultSettings";

export interface TestElementSetting {
  atomic: number;
  enabled: boolean;
  stats: {
    times: number;
    right: number;
    wrong: number;
  };
}

export interface ValencesTestSettings {
  elements: TestElementSetting[] | null;
}

export interface PeriodicTableTestSettings {
  elements: TestElementSetting[] | null;
}

export interface Settings {
  [key: string]: any;
  theme: string;
  locale: string;
  tests: {
    valences: ValencesTestSettings;
    periodicTable: PeriodicTableTestSettings;
  };
}

class AppSettings {
  private static STORAGE_KEY = "atom:settings";

  public settings!: Settings;

  public loadSettings() {
    const appSettings = JSON.parse(
      localStorage.getItem(AppSettings.STORAGE_KEY) ?? "null"
    );

    if (!appSettings) {
      return this.setDefaultSettings();
    }

    this.settings = appSettings;
  }

  public save() {
    localStorage.setItem(
      AppSettings.STORAGE_KEY,
      JSON.stringify(this.settings)
    );
  }

  private setDefaultSettings() {
    this.settings = defaultSettings;
    this.save();
  }
}

export default new AppSettings();
