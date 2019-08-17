const platformMethods = {
  getDebugMode: () => process.env.NODE_ENV !== "production",
  isHybrid: () => false,
  getSystemLanguage: () => window.navigator.language
};

const AtomNative = ((window as any).AtomNative =
  global.AtomNative || platformMethods);

class NativeBridge {
  public isHybrid() {
    return this.exec("isHybrid");
  }

  public getDebugMode() {
    return this.exec("getDebugMode");
  }

  public getSystemLanguage() {
    return this.exec("getSystemLanguage");
  }

  private exec<T extends keyof typeof AtomNative>(
    methodName: T
  ): ReturnType<(typeof AtomNative)[T]> {
    return (AtomNative[methodName]
      ? AtomNative[methodName]()
      : platformMethods[methodName]()) as any;
  }
}

export default new NativeBridge();
