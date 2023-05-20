const platformMethods: typeof window.AtomNative = {
  getDebugMode: () => import.meta.env.DEV,
  isHybrid: () => false,
  getSystemLanguage: () => window.navigator.language,
  rateApp: () => {
    if (/android/i.test(navigator.userAgent)) {
      window.open("market://details?id=tk.horusgoul.valenciasquimicas");
    }
  },
};

const AtomNative = (window.AtomNative = window.AtomNative || platformMethods);

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

  public rateApp() {
    return this.exec("rateApp");
  }

  private exec<T extends keyof typeof AtomNative>(
    methodName: T
  ): ReturnType<NonNullable<typeof AtomNative[T]>> {
    return (AtomNative[methodName]
      ? AtomNative[methodName]?.()
      : platformMethods[methodName]?.()) as ReturnType<
      NonNullable<typeof AtomNative[T]>
    >;
  }
}

export default new NativeBridge();
