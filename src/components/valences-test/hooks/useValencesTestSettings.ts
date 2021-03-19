import * as React from "react";
import { useSettings, ElementsSettings } from "@/hooks/useSettings";
import { useElements } from "@/hooks/useElements";

export function useValencesTestSettings() {
  const { settings, updateSettings } = useSettings();
  const { elements } = useElements();

  const defaultSetting = React.useMemo(
    () => ({
      elements: elements.map((element) => ({
        atomic: element.atomic,
        enabled: element.testState.valencesTest,
        stats: {
          right: 0,
          times: 0,
          wrong: 0,
        },
      })),
    }),
    [elements]
  );

  const storedSettings = settings.tests.valences;

  const updateTestSettings = React.useCallback(
    (updateFunction: (settings: ElementsSettings) => void) => {
      updateSettings((settings) => {
        updateFunction(settings.tests.valences);
      });
    },
    [updateSettings]
  );

  const resetSettings = React.useCallback(() => {
    updateTestSettings((settings) => {
      settings.elements = defaultSetting.elements;
    });
  }, [updateTestSettings, defaultSetting]);

  React.useEffect(() => {
    if (!settings.tests.valences.elements) {
      resetSettings();
    }
  }, [settings, resetSettings]);

  return {
    settings: storedSettings.elements ? storedSettings : defaultSetting,
    updateSettings: updateTestSettings,
    resetSettings,
  };
}
