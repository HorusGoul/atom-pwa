import NativeBridge from "@/NativeBridge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCallback } from "react";

export interface RateAppConfig {
  timesLaunched: number;
  rated: boolean;
}

const RATE_APP_STORAGE_KEY = "atom:rate_app";

const initialValue: RateAppConfig = {
  timesLaunched: 0,
  rated: false,
};

export function useRateApp() {
  const [config, setConfig] = useLocalStorage<RateAppConfig>(
    RATE_APP_STORAGE_KEY,
    initialValue
  );

  const launchRateAppFlow = useCallback(
    (openMarket = false) => {
      if (!NativeBridge.isHybrid()) {
        return;
      }

      NativeBridge.rateApp(openMarket);

      setConfig((current) => ({
        ...current,
        rated: true,
      }));
    },
    [setConfig]
  );

  return {
    config,
    setConfig,
    launchRateAppFlow,
  };
}
