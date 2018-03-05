import * as React from "react";
import { i18n } from "../../../Locale";
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

interface ITestEntryProps extends ITestEntry {
  onPracticeClick?: () => void;
  onSettingsClick?: () => void;
}

type Props = ITestEntryProps;

class TestEntry extends React.Component<Props, {}> {
  public render() {
    const {
      title,
      description,
      testRoute,
      settingsRoute,
      onPracticeClick,
      onSettingsClick
    } = this.props;

    return (
      <Card className="test-entry">
        <div className="test-entry__header">
          <div className="test-entry__title">{title}</div>

          <IconButton
            className="test-entry__settings-button"
            iconName="settings"
            onClick={onSettingsClick}
          />
        </div>

        <div className="test-entry__description">{description}</div>

        <div className="test-entry__footer">
          <Button onClick={onPracticeClick}>{i18n("practice")}</Button>
        </div>
      </Card>
    );
  }
}

export default TestEntry;
