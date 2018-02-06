import * as React from "react";

import QuestionCard from "./question-card/QuestionCard";

import "./QuestionsTest.scss";

class QuestionsTest extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="questions-test">
        <QuestionCard />
      </div>
    );
  }
}

export default QuestionsTest;
