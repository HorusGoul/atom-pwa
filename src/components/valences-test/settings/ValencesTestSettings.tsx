import * as React from "react";
import { useHistory } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { TEST_SELECTION } from "@/routes";
import IconButton from "../../shared/icon-button/IconButton";
import Navbar from "../../shared/navbar/Navbar";
import { useValencesTestSettings } from "../hooks/useValencesTestSettings";
import "./ValencesTestSettings.scss";
import PeriodicTable from "@/components/periodic-table/PeriodicTable";
import { useElements } from "@/hooks/useElements";
import PtElementSetting from "@/components/pt-element/PtElementSetting";

function ValencesTestSettings() {
  const history = useHistory();
  const { i18n } = useLocale();
  const { settings, updateSettings, resetSettings } = useValencesTestSettings();

  const elementStates = React.useMemo(() => {
    const elements = settings.elements ?? [];

    return elements.reduce((map, element) => {
      map[element.atomic] = element.enabled;

      return map;
    }, {} as Record<number, boolean>);
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

  const { getElement } = useElements();

  const elementRenderer = (atomic: number) => {
    const element = getElement(atomic);
    const enabled = elementStates[atomic];
    const isAvailable = atomic in elementStates;

    if (!isAvailable) {
      return null;
    }

    return (
      <PtElementSetting
        element={element}
        enabled={enabled}
        onClick={(element) => {
          onTestElementSettingsClick(element.atomic);
        }}
      />
    );
  };

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
      </div>

      <div className="valences-test-settings__table">
        <PeriodicTable elementRenderer={elementRenderer} />
      </div>
    </div>
  );
}

export default ValencesTestSettings;
