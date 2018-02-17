import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AppSettings, {
  ITestElementSettings,
  IValencesTestSettings
} from "../../../AppSettings";
import ElementManager from "../../../ElementManager";
import Button from "../../shared/button/Button";
import Checkbox from "../../shared/checkbox/Checkbox";
import IconButton from "../../shared/icon-button/IconButton";
import Navbar from "../../shared/navbar/Navbar";
import TestElementSettings from "../../test-element-settings/TestElementSettings";

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
    .filter(element => element.valency)
    .map(element => ({
      atomic: element.atomic,
      enabled: element.testState.valencesTest,
      stats: {
        right: 0,
        times: 0,
        wrong: 0
      }
    }));

  AppSettings.save();
}

import "./ValencesTestSettings.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

interface IValencesTestSettingsState {
  elementStates: ITestElementSettings[];
}

@autobind
class ValencesTestSettings extends React.Component<
  Props,
  IValencesTestSettingsState
> {
  public state: IValencesTestSettingsState = {
    elementStates: []
  };

  private settings: IValencesTestSettings = getValencesTestSettings();

  public componentDidMount() {
    this.setElementStates();
  }

  public render() {
    const { elementStates } = this.state;

    return (
      <div className="valences-test-settings">
        <Navbar
          title="Settings"
          backButton={true}
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        <div className="valences-test-settings__content">
          <div className="valences-test-settings__text">
            Select the elements you want to learn. Elements not displayed aren't
            supported in this test.
          </div>

          <div className="valences-test-settings__buttons">
            <IconButton
              onClick={this.onSelectAllButtonClick}
              iconName="check_box_true"
              text="Select all"
            />
            <IconButton
              onClick={this.onDeselectAllButtonClick}
              iconName="check_box_false"
              text="Deselect all"
            />
            <IconButton
              onClick={this.onRestoreDefaultsButtonClick}
              iconName="restore"
              text="Restore defaults"
            />
          </div>

          {elementStates.map(elementState => (
            <TestElementSettings
              key={elementState.atomic}
              setting={elementState}
              onClick={this.onTestElementSettingsClick}
            />
          ))}
        </div>
      </div>
    );
  }

  private onSelectAllButtonClick() {
    this.settings.elements = this.settings.elements.map(element => ({
      ...element,
      enabled: true
    }));

    AppSettings.save();
    this.setElementStates();
  }

  private onDeselectAllButtonClick() {
    this.settings.elements = this.settings.elements.map(element => ({
      ...element,
      enabled: false
    }));

    AppSettings.save();
    this.setElementStates();
  }

  private onRestoreDefaultsButtonClick() {
    setDefaultValencesTestSettings();
    this.setElementStates();
  }

  private onTestElementSettingsClick(atomic: number) {
    const element = this.settings.elements.find(
      elementSettings => elementSettings.atomic === atomic
    );
    element.enabled = !element.enabled;

    AppSettings.save();

    this.setElementStates();
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }

  private setElementStates() {
    const elements = this.settings.elements;

    this.setState({
      elementStates: [...elements]
    });
  }
}

export default withRouter<Props>(ValencesTestSettings);
