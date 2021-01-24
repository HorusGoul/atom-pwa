interface Window {
  dataLayer: any[];
  AtomNative: {
    isHybrid?: () => boolean;
    getDebugMode?: () => boolean;
    getSystemLanguage?: () => string | undefined;
  };
  AtomNativeFA: {
    logEvent?: (type: string, jsonParams: string) => void;
    setUserProperty?: (name: string, value: string) => void;
  };

  // @ts-ignore
  gtag: Gtag.Gtag;
}

declare module '*.svg' {
  export const ReactComponent: React.ComponentType<React.SVGAttributes<SVGElement>>;
}