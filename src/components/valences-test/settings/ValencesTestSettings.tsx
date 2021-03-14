import * as React from "react";
import { useVirtualScroller, VirtualScroller } from "react-hyper-scroller";
import { useHistory } from "react-router-dom";
import AppSettings, {
  ITestElementSettings,
  IValencesTestSettings,
} from "../../../AppSettings";
import ElementManager from "../../../ElementManager";
import { i18n } from "../../../Locale";
import { TEST_SELECTION } from "../../../routes";
import IconButton from "../../shared/icon-button/IconButton";
import Navbar from "../../shared/navbar/Navbar";
import TestElementSettings from "../../test-element-settings/TestElementSettings";
import "./ValencesTestSettings.scss";

export function getValencesTestSettings() {
  const settings = AppSettings.settings.tests.valences;

  if (!settings.elements) {
    setDefaultValencesTestSettings();
  }

  return settings;
}

export function setDefaultValencesTestSettings() {
  const settings = AppSettings.settings.tests.valences;
  const elements = ElementManager.getElements();

  settings.elements = elements
    .filter((element) => element.valency)
    .map((element) => ({
      atomic: element.atomic,
      enabled: element.testState.valencesTest,
      stats: {
        right: 0,
        times: 0,
        wrong: 0,
      },
    }));

  AppSettings.save();
}

interface IValencesTestSettingsState {
  elementStates: ITestElementSettings[];
  updateListKey: number;
}

let settings: IValencesTestSettings;

function ValencesTestSettings() {
  const history = useHistory();

  if (!settings) {
    settings = getValencesTestSettings();
  }

  const [state, setState] = React.useState<IValencesTestSettingsState>(() => ({
    elementStates: [],
    updateListKey: 0,
  }));

  const setElementStates = React.useCallback(() => {
    const elements = settings.elements ?? [];

    setState((current) => ({
      elementStates: [...elements],
      updateListKey: current.updateListKey + 1,
    }));
  }, []);

  React.useEffect(() => {
    setElementStates();
  }, [setElementStates]);

  const onSelectAllButtonClick = React.useCallback(() => {
    settings.elements = settings.elements!.map((element) => ({
      ...element,
      enabled: true,
    }));

    AppSettings.save();
    setElementStates();
  }, [setElementStates]);

  const onDeselectAllButtonClick = React.useCallback(() => {
    settings.elements = settings.elements!.map((element) => ({
      ...element,
      enabled: false,
    }));

    AppSettings.save();
    setElementStates();
  }, [setElementStates]);

  const onRestoreDefaultsButtonClick = React.useCallback(() => {
    setDefaultValencesTestSettings();
    setElementStates();
  }, [setElementStates]);

  const onNavbarButtonClick = React.useCallback(() => {
    history.push(TEST_SELECTION);
  }, [history]);

  const onTestElementSettingsClick = React.useCallback(
    (atomic: number) => {
      const element = settings.elements!.find(
        (elementSettings) => elementSettings.atomic === atomic
      );
      element!.enabled = !element!.enabled;

      AppSettings.save();

      setElementStates();
    },
    [setElementStates]
  );

  const rowRenderer = React.useCallback(
    (index: number, ref: React.RefObject<HTMLDivElement>) => {
      const { elementStates } = state;
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
    [state, onTestElementSettingsClick]
  );

  const scroller = useVirtualScroller({
    estimatedItemHeight: 64,
    itemCount: state.elementStates.length,
  });

  const { updateProjection } = scroller;

  React.useEffect(() => {
    updateProjection();
  }, [state, updateProjection]);

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
