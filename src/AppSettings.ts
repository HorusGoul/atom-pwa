import defaultSettings from "./defaultSettings";

interface ITestElementSettings {
  atomic: number;
  enabled: boolean;
  stats: {
    times: number;
    right: number;
    wrong: number;
  };
}

export interface IValencesTestSettings {
  elements: ITestElementSettings[];
}

export interface ISettings {
  [key: string]: any;
  theme: string;
  tests: {
    valences: IValencesTestSettings;
    periodicTable: {
      elements: ITestElementSettings[];
    };
  };
}

class AppSettings {
  private static STORAGE_KEY = "atom:settings";

  public settings: ISettings;

  public loadSettings() {
    const appSettings = JSON.parse(
      localStorage.getItem(AppSettings.STORAGE_KEY)
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
