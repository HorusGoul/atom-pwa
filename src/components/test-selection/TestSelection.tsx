import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { i18n } from "../../Locale";
import { MAIN_MENU } from "../../routes";
import Card from "../shared/card/Card";
import Navbar from "../shared/navbar/Navbar";
import TestEntry, { ITestEntry } from "./test-entry/TestEntry";
import "./TestSelection.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

@autobind
class TestSelection extends React.Component<Props, {}> {
  private testEntries: ITestEntry[] = [
    {
      description: i18n("valences_test_desc"),
      settingsRoute: "/tests/valences/settings",
      testRoute: "/tests/valences",
      title: i18n("valences_test")
    },
    {
      description: i18n("periodic_table_test_desc"),
      settingsRoute: "/tests/periodic-table/settings",
      testRoute: "/tests/periodic-table",
      title: i18n("periodic_table_test")
    }
  ];

  public render() {
    return (
      <div className="test-selection">
        <Navbar
          className="test-selection__navbar"
          backButton={true}
          title={i18n("nav_test")}
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        <div className="test-selection__entries">
          {this.testEntries.map((testEntry, index) => (
            <TestEntry
              key={index}
              {...testEntry}
              onPracticeClick={this.onTestEntryPracticeListener(testEntry)}
              onSettingsClick={this.onTestEntrySettingsListener(testEntry)}
            />
          ))}
        </div>
      </div>
    );
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.push(MAIN_MENU);
  }

  private onTestEntryPracticeListener(entry: ITestEntry) {
    return () => this.onTestEntryPracticeClick(entry);
  }

  private onTestEntryPracticeClick(entry: ITestEntry) {
    const { history } = this.props;
    history.push(entry.testRoute);
  }

  private onTestEntrySettingsListener(entry: ITestEntry) {
    return () => this.onTestEntrySettingsClick(entry);
  }

  private onTestEntrySettingsClick(entry: ITestEntry) {
    const { history } = this.props;
    history.push(entry.settingsRoute);
  }
}

export default withRouter<Props>(TestSelection);
