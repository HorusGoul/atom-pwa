import { logEvent } from "@/services/spycat";
import classNames from "classnames";
import * as React from "react";
import { useLocale } from "@/hooks/useLocale";
import IconButton from "@/components/shared/icon-button/IconButton";
import "./TestResults.scss";
import { useRateApp } from "@/components/rate-app/useRateApp";

export interface TestResultsProps {
  gaTestName: string;
  rightAnswers: number;
  wrongAnswers: number;
  onRepeat?: () => void;
  onRepeatWrongAnswers?: () => void;
}

function TestResults({
  rightAnswers,
  wrongAnswers,
  onRepeat,
  onRepeatWrongAnswers,
  gaTestName,
}: TestResultsProps) {
  const total = rightAnswers + wrongAnswers;
  const percentage = total ? rightAnswers / total : 1;

  const { i18n } = useLocale();
  const goodResults = percentage > 0.7;

  React.useEffect(() => {
    if (total > 0) {
      logEvent("test", {
        event_action: `Finished a ${gaTestName}`,
        value: percentage,
      });
    }
  }, [total, percentage, gaTestName]);

  const { launchRateAppFlow } = useRateApp();

  React.useEffect(() => {
    if (goodResults) {
      launchRateAppFlow();
    }
  }, [goodResults, launchRateAppFlow]);

  return (
    <div
      className={classNames("test-results", {
        "test-results--good": goodResults,
      })}
    >
      <div className="test-results__title">{i18n("test_results")}</div>

      <div className="test-results__data">
        <span className="test-results__data__right">{rightAnswers}</span>

        <span className="test-results__data__divider">/</span>

        <span className="test-results__data__total">{total}</span>
      </div>

      <div className="test-results__buttons">
        {onRepeat && (
          <IconButton
            iconName="replay"
            text={i18n("retake_full_test")}
            onClick={onRepeat}
          />
        )}

        {onRepeatWrongAnswers && rightAnswers !== total && (
          <IconButton
            iconName="edit"
            text={i18n("retake_incorrect_answers")}
            onClick={onRepeatWrongAnswers}
          />
        )}
      </div>
    </div>
  );
}

export default TestResults;
