import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Card from "../shared/card/Card";
import Navbar from "../shared/navbar/Navbar";
import TestEntry, { ITestEntry } from "./test-entry/TestEntry";

import "./TestSelection.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

@autobind
class TestSelection extends React.Component<Props, {}> {
  private testEntries: ITestEntry[] = [
    {
      description:
        "Memorize the valences practicing with this test, you just need to select the correct option on the list. To disable elements, go to the settings inside the test.",
      settingsRoute: "",
      testRoute: "",
      title: "Valences Test"
    },
    {
      description:
        "Are you able to complete the periodic table without errors? Just try to set the elements in the places they belong to. You can disable elements in the settings.",
      settingsRoute: "",
      testRoute: "",
      title: "Periodic table"
    }
  ];

  public render() {
    return (
      <div className="test-selection">
        <Navbar
          backButton={true}
          title="Tests"
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        <div className="test-selection__entries">
          {this.testEntries.map((testEntry, index) => (
            <TestEntry key={index} {...testEntry} />
          ))}
        </div>
      </div>
    );
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }
}

export default withRouter<Props>(TestSelection);
