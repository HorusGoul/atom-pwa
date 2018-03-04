import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AppSettings, {
  IPeriodicTableTestSettings,
  ITestElementSettings
} from "../../../AppSettings";
import ElementManager from "../../../ElementManager";
import Button from "../../shared/button/Button";
import Checkbox from "../../shared/checkbox/Checkbox";
import IconButton from "../../shared/icon-button/IconButton";
import Navbar from "../../shared/navbar/Navbar";
import TestElementSettings from "../../test-element-settings/TestElementSettings";

export function getPeriodicTableTestSettings() {
  const settings = AppSettings.settings.tests.periodicTable;

  if (!settings.elements) {
    setDefaultPeriodicTableTestSettings();
  }

  return settings;
}

export function setDefaultPeriodicTableTestSettings() {
  const settings = AppSettings.settings.tests.periodicTable;
  const elements = ElementManager.getElements();

  settings.elements = elements.map(element => ({
    atomic: element.atomic,
    enabled: element.testState.ptTest,
    stats: {
      right: 0,
      times: 0,
      wrong: 0
    }
  }));

  AppSettings.save();
}

import {
  AutoSizer,
  List,
  ListRowProps,
  WindowScroller
} from "react-virtualized";
import "./PeriodicTableTestSettings.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

interface IPeriodicTableTestSettingsState {
  elementStates: ITestElementSettings[];
}

@autobind
class PeriodicTableTestSettings extends React.Component<
  Props,
  IPeriodicTableTestSettingsState
> {
  public state: IPeriodicTableTestSettingsState = {
    elementStates: []
  };

  private settings: IPeriodicTableTestSettings = getPeriodicTableTestSettings();
  private listComponent: List;

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

          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight={true}>
                {({ width }) => (
                  <List
                    ref={this.setListComponent}
                    autoHeight={true}
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    overscanRowCount={2}
                    rowCount={elementStates.length}
                    rowHeight={64}
                    rowRenderer={this.rowRenderer}
                    width={width}
                    scrollTop={scrollTop}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        </div>
      </div>
    );
  }

  private setListComponent(list: List) {
    this.listComponent = list;
  }

  private rowRenderer(props: ListRowProps) {
    const { index, key, style } = props;

    const { elementStates } = this.state;
    const elementState = elementStates[index];

    return (
      <div key={key} style={style}>
        <TestElementSettings
          setting={elementState}
          onClick={this.onTestElementSettingsClick}
        />
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
    setDefaultPeriodicTableTestSettings();
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

    this.listComponent.forceUpdateGrid();
  }
}

export default withRouter<Props>(PeriodicTableTestSettings);
