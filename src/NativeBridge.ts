const AtomNative = ((window as any).AtomNative = {
  getDebugMode: () => process.env.NODE_ENV !== "production",
  isHybrid: () => false,
  getSystemLanguage: () => window.navigator.language,
  ...global.AtomNative
});

class NativeBridge {
  public isHybrid() {
    return AtomNative.isHybrid();
  }

  public getDebugMode() {
    return AtomNative.getDebugMode();
  }

  public getSystemLanguage(): string | undefined {
    return AtomNative.getSystemLanguage();
  }
}

export default new NativeBridge();
