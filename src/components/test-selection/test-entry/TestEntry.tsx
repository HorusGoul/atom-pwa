import * as React from "react";
import { i18n } from "../../../Locale";
import Button from "../../shared/button/Button";
import Card from "../../shared/card/Card";
import IconButton from "../../shared/icon-button/IconButton";
import "./TestEntry.scss";
import Icon from "../../shared/icon/Icon";

export interface ITestEntry {
  title: string;
  description: string;
  testRoute: string;
  settingsRoute: string;
}

interface TestEntryProps extends ITestEntry {
  onPracticeClick?: () => void;
  onSettingsClick?: () => void;
}

function TestEntry({
  title,
  description,
  onPracticeClick,
  onSettingsClick,
}: TestEntryProps) {
  return (
    <Card className="test-entry">
      <div className="test-entry__header">
        <div className="test-entry__title">{title}</div>

        <IconButton
          circle={true}
          className="test-entry__settings-button"
          iconName="settings"
          onClick={onSettingsClick}
        />
      </div>

      <div className="test-entry__description">{description}</div>

      <div className="test-entry__footer">
        <Button
          onClick={onPracticeClick}
          className="test-entry__practice-button"
        >
          {i18n("practice")}
          <Icon name="arrow_forward" />
        </Button>
      </div>
    </Card>
  );
}

export default TestEntry;
