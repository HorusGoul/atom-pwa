interface Window {
  AtomNative: {
    isHybrid?: () => boolean;
    getDebugMode?: () => boolean;
    getSystemLanguage?: () => string | undefined;
    rateApp?: () => void;
  };
}

declare module "*.svg" {
  export const ReactComponent: React.ComponentType<
    React.SVGAttributes<SVGElement>
  >;
}
