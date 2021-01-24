import firebase from "firebase/app";

import packageConfig from "../package.json";

const platformConfig = {
  app_name: packageConfig.name,
  app_version: packageConfig.version,
};

const platformFAMethods: typeof window.AtomNativeFA = {
  logEvent: (type, jsonParams) => {
    const params = JSON.parse(jsonParams);

    firebase.analytics().logEvent(type, params);
  },
  setUserProperty: (name, value) => {
    firebase.analytics().setUserProperties({ [name]: value });
  },
};

const AtomNativeFA = (window.AtomNativeFA =
  window.AtomNativeFA || platformFAMethods);

class NativeFABridge {
  public logEvent(type: string, params: any) {
    params.app_name = platformConfig.app_name;
    params.app_version = platformConfig.app_version;

    return this.exec("logEvent", type, JSON.stringify(params));
  }

  public setUserProperty(name: string, value: string) {
    return this.exec("setUserProperty", name, value);
  }

  private exec<T extends keyof typeof AtomNativeFA>(
    methodName: T,
    ...params: any[]
  ): // @ts-ignore fix this
  ReturnType<typeof AtomNativeFA[T]> {
    return (AtomNativeFA[methodName]
      ? (AtomNativeFA[methodName] as any)(...params)
      : (platformFAMethods[methodName] as any)(...params)) as any;
  }
}

const platformMethods: typeof window.AtomNative = {
  getDebugMode: () => process.env.NODE_ENV !== "production",
  isHybrid: () => false,
  getSystemLanguage: () => window.navigator.language,
};

const AtomNative = (window.AtomNative = window.AtomNative || platformMethods);

class NativeBridge {
  public fa = new NativeFABridge();

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
    // @ts-ignore fix this
  ): ReturnType<typeof AtomNative[T]> {
    return (AtomNative[methodName]
      ? AtomNative[methodName]?.()
      : platformMethods[methodName]?.()) as any;
  }
}

export default new NativeBridge();
