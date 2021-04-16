import * as React from "react";
import { useVirtualScroller, VirtualScroller } from "react-hyper-scroller";
import { useHistory } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { TEST_SELECTION } from "@/routes";
import IconButton from "../../shared/icon-button/IconButton";
import Navbar from "../../shared/navbar/Navbar";
import TestElementSettings from "../../test-element-settings/TestElementSettings";
import { useValencesTestSettings } from "../hooks/useValencesTestSettings";
import "./ValencesTestSettings.scss";

function ValencesTestSettings() {
  const history = useHistory();
  const { i18n } = useLocale();
  const { settings, updateSettings, resetSettings } = useValencesTestSettings();

  const elementStates = React.useMemo(() => {
    const elements = settings.elements ?? [];

    return elements.sort((a, b) => a.atomic - b.atomic);
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

export default ValencesTestSettings;
