import * as React from "react";

import Button from "../../shared/button/Button";
import Card from "../../shared/card/Card";
import IconButton from "../../shared/icon-button/IconButton";

import "./TestEntry.scss";

export interface ITestEntry {
  title: string;
  description: string;
  testRoute: string;
  settingsRoute: string;
}

type Props = ITestEntry;

class TestEntry extends React.Component<Props, {}> {
  public render() {
    const { title, description, testRoute, settingsRoute } = this.props;

    return (
      <Card className="test-entry">
        <div className="test-entry__header">
          <div className="test-entry__title">{title}</div>

          <IconButton
            className="test-entry__settings-button"
            iconName="settings"
          />
        </div>

        <div className="test-entry__description">{description}</div>

        <div className="test-entry__footer">
          <Button>Practice</Button>
        </div>
      </Card>
    );
  }
}

export default TestEntry;
