import classNames = require("classnames");
import * as React from "react";
import { i18n } from "../../Locale";
import IconButton from "../shared/icon-button/IconButton";
import "./TestResults.scss";

interface ITestResultsProps {
  rightAnswers: number;
  wrongAnswers: number;
  onRepeat?: () => void;
  onRepeatWrongAnswers?: () => void;
}

class TestResults extends React.Component<ITestResultsProps, {}> {
  public render() {
    const {
      rightAnswers,
      wrongAnswers,
      onRepeat,
      onRepeatWrongAnswers
    } = this.props;

    const total = rightAnswers + wrongAnswers;
    const percentaje = total ? rightAnswers / total : 1;

    return (
      <div
        className={classNames("test-results", {
          "test-results--good": percentaje > 0.7
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

          {onRepeatWrongAnswers &&
            rightAnswers !== total && (
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
}

export default TestResults;
