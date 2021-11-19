import * as React from "react";
import HyperScroller from "react-hyper-scroller";
import { useHistory } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { TEST_SELECTION } from "@/routes";
import IconButton from "../../shared/icon-button/IconButton";
import Navbar from "../../shared/navbar/Navbar";
import TestElementSettings from "../../test-element-settings/TestElementSettings";
import { usePeriodicTableTestSettings } from "../hooks/usePeriodicTableTestSettings";
import "./PeriodicTableTestSettings.scss";

function PeriodicTableTestSettings() {
  const history = useHistory();
  const { i18n } = useLocale();
  const {
    settings,
    updateSettings,
    resetSettings,
  } = usePeriodicTableTestSettings();

  const elementStates = React.useMemo(() => {
    const elements = settings.elements ?? [];

    return elements.slice().sort((a, b) => a.atomic - b.atomic);
  }, [settings.elements]);

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
    resetSettings();
  }, [resetSettings]);

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

        <HyperScroller estimatedItemHeight={64} measureItems={false}>
          {elementStates.map((elementState) => (
            <TestElementSettings
              key={elementState.atomic}
              setting={elementState}
              onClick={onTestElementSettingsClick}
            />
          ))}
        </HyperScroller>
      </div>
    </div>
  );
}

export default PeriodicTableTestSettings;
