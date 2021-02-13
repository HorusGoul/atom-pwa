interface Window {
  AtomNative: {
    isHybrid?: () => boolean;
    getDebugMode?: () => boolean;
    getSystemLanguage?: () => string | undefined;
  };
}

declare module "*.svg" {
  export const ReactComponent: React.ComponentType<
    React.SVGAttributes<SVGElement>
  >;
}
