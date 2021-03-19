import * as React from "react";
import { Element } from "@/Element";
import { useSettings, Settings, ElementsSettings } from "./useSettings";
import { useElements } from "./useElements";

export function useTestSettings(
  storageKey: keyof Settings["tests"],
  enabledKey: keyof Element["testState"]
) {
  const { settings, updateSettings } = useSettings();
  const { elements } = useElements();

  const defaultSetting = React.useMemo(
    () => ({
      elements: elements.map((element) => ({
        atomic: element.atomic,
        enabled: element.testState[enabledKey],
        stats: {
          right: 0,
          times: 0,
          wrong: 0,
        },
      })),
    }),
    [enabledKey, elements]
  );

  const storedSettings = settings.tests[storageKey];

  const updateTestSettings = React.useCallback(
    (updateFunction: (settings: ElementsSettings) => void) => {
      updateSettings((settings) => {
        updateFunction(settings.tests[storageKey]);
      });
    },
    [storageKey, updateSettings]
  );

  const resetSettings = React.useCallback(() => {
    updateTestSettings((settings) => {
      settings.elements = defaultSetting.elements;
    });
  }, [updateTestSettings, defaultSetting]);

  React.useEffect(() => {
    if (!settings.tests[storageKey].elements) {
      resetSettings();
    }
  }, [storageKey, settings, resetSettings]);

  return {
    settings: storedSettings.elements ? storedSettings : defaultSetting,
    updateSettings: updateTestSettings,
    resetSettings,
  };
}
