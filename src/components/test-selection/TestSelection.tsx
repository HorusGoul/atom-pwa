import * as React from "react";
import { useHistory } from "react-router";
import { i18n } from "../../Locale";
import { MAIN_MENU } from "../../routes";
import Navbar from "../shared/navbar/Navbar";
import TestEntry from "./test-entry/TestEntry";
import "./TestSelection.scss";

function TestSelection() {
  const testEntries = [
    {
      description: i18n("valences_test_desc"),
      settingsRoute: "/tests/valences/settings",
      testRoute: "/tests/valences",
      title: i18n("valences_test"),
    },
    {
      description: i18n("periodic_table_test_desc"),
      settingsRoute: "/tests/periodic-table/settings",
      testRoute: "/tests/periodic-table",
      title: i18n("periodic_table_test"),
    },
  ];

  const history = useHistory();

  return (
    <div className="test-selection">
      <Navbar
        className="test-selection__navbar"
        title={i18n("nav_test")}
        // TODO: replace "push" with "replace" in the future
        onBackButtonClick={() => history.push(MAIN_MENU)}
      />

      <div className="test-selection__entries">
        {testEntries.map((testEntry, index) => (
          <TestEntry
            key={index}
            {...testEntry}
            onPracticeClick={() => history.push(testEntry.testRoute)}
            onSettingsClick={() => history.push(testEntry.settingsRoute)}
          />
        ))}
      </div>
    </div>
  );
}

export default TestSelection;
