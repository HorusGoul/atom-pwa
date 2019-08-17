const platformMethods = {
  getDebugMode: () => process.env.NODE_ENV !== "production",
  isHybrid: () => false,
  getSystemLanguage: () => window.navigator.language
};

const AtomNative = ((window as any).AtomNative =
  global.AtomNative || platformMethods);

class NativeBridge {
  public isHybrid() {
    return AtomNative.isHybrid
      ? AtomNative.isHybrid()
      : platformMethods.isHybrid();
  }

  public getDebugMode() {
    return AtomNative.getDebugMode
      ? AtomNative.getDebugMode()
      : platformMethods.getDebugMode();
  }

  public getSystemLanguage(): string | undefined {
    return AtomNative.getSystemLanguage
      ? AtomNative.getSystemLanguage()
      : platformMethods.getSystemLanguage();
  }
}

export default new NativeBridge();
