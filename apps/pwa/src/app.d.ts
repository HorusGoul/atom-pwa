interface Window {
  AtomNative?: {
    isHybrid?: () => boolean;
    getDebugMode?: () => boolean;
    getSystemLanguage?: () => string | undefined;
    rateApp?: (openMarket?: boolean) => void;
  };
  __DEBUG__?: boolean;
}

declare module "*.svg" {
  export const ReactComponent: React.ComponentType<
    React.SVGAttributes<SVGElement>
  >;
}
