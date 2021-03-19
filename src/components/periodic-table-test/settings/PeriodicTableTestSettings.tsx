import * as React from "react";
import { useVirtualScroller, VirtualScroller } from "react-hyper-scroller";
import { useHistory } from "react-router-dom";
import { IPeriodicTableTestSettings } from "@/AppSettings";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import { TEST_SELECTION } from "@/routes";
import IconButton from "../../shared/icon-button/IconButton";
import Navbar from "../../shared/navbar/Navbar";
import TestElementSettings from "../../test-element-settings/TestElementSettings";
import "./PeriodicTableTestSettings.scss";

export function usePeriodicTableTestSettings() {
  const { settings, updateSettings } = useAppSettings();
  const { elements } = useElements();

  const updatePeriodicTableTestSettings = React.useCallback(
    (updateFunction: (settings: IPeriodicTableTestSettings) => void) => {
      updateSettings((settings) => {
        updateFunction(settings.tests.periodicTable);
      });
    },
    [updateSettings]
  );

  const setDefaultPeriodicTableTestSettings = React.useCallback(() => {
    updatePeriodicTableTestSettings((settings) => {
      settings.elements = elements.map((element) => ({
        atomic: element.atomic,
        enabled: element.testState.ptTest,
        stats: {
          right: 0,
          times: 0,
          wrong: 0,
        },
      }));
    });
  }, [elements, updatePeriodicTableTestSettings]);

  React.useEffect(() => {
    if (!settings.tests.periodicTable.elements) {
      setDefaultPeriodicTableTestSettings();
    }
  }, [settings, setDefaultPeriodicTableTestSettings]);

  return {
    settings: settings.tests.periodicTable,
    updateSettings: updatePeriodicTableTestSettings,
    setDefaultSettings: setDefaultPeriodicTableTestSettings,
  };
}

function PeriodicTableTestSettings() {
  const history = useHistory();
  const { i18n } = useLocale();
  const {
    settings,
    updateSettings,
    setDefaultSettings,
  } = usePeriodicTableTestSettings();

  const elementStates = React.useMemo(() => settings.elements ?? [], [
    settings,
  ]);

  const onSelectAllButtonClick = React.useCallback(() => {
    updateSettings((settings) => {
      settings.elements =
        settings.elements?.map((element) => ({
          ...element,
          enabled: true,
        })) ?? null;
    });
  }, [updateSettings]);

  const onDeselectAllButtonClick = React.useCallback(() => {
    updateSettings((settings) => {
      settings.elements =
        settings.elements?.map((element) => ({
          ...element,
          enabled: false,
        })) ?? null;
    });
  }, [updateSettings]);

  const onRestoreDefaultsButtonClick = React.useCallback(() => {
    setDefaultSettings();
  }, [setDefaultSettings]);

  const onNavbarButtonClick = React.useCallback(() => {
    history.push(TEST_SELECTION);
  }, [history]);

  const onTestElementSettingsClick = React.useCallback(
    (atomic: number) => {
      updateSettings((settings) => {
        const element = settings.elements?.find(
          (elementSettings) => elementSettings.atomic === atomic
        );

        if (element) {
          element.enabled = !element.enabled;
        }
      });
    },
    [updateSettings]
  );

  const rowRenderer = React.useCallback(
    (index: number, ref: React.RefObject<HTMLDivElement>) => {
      const elementState = elementStates[index];

      return (
        <div key={elementState.atomic} ref={ref}>
          <TestElementSettings
            setting={elementState}
            onClick={onTestElementSettingsClick}
          />
        </div>
      );
    },
    [elementStates, onTestElementSettingsClick]
  );

  const scroller = useVirtualScroller({
    estimatedItemHeight: 64,
    itemCount: elementStates.length,
  });

  const { updateProjection } = scroller;

  React.useEffect(() => {
    updateProjection();
  }, [elementStates, updateProjection]);

  return (
    <div className="valences-test-settings">
      <Navbar
        title={i18n("nav_settings")}
        onBackButtonClick={onNavbarButtonClick}
      />

      <div className="valences-test-settings__content">
        <div className="valences-test-settings__text">
          {i18n("select_elements")}
        </div>

        <div className="valences-test-settings__buttons">
          <IconButton
            onClick={onSelectAllButtonClick}
            iconName="check_box_true"
            text={i18n("select_all")}
          />
          <IconButton
            onClick={onDeselectAllButtonClick}
            iconName="check_box_false"
            text={i18n("deselect_all")}
          />
          <IconButton
            onClick={onRestoreDefaultsButtonClick}
            iconName="restore"
            text={i18n("restore_defaults")}
          />
        </div>

        <VirtualScroller {...scroller} itemRenderer={rowRenderer} />
      </div>
    </div>
  );
}

export default PeriodicTableTestSettings;
