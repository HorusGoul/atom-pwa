import * as React from "react";

import { IQuestionCardAnswer } from "./question-card/question-card-answer/QuestionCardAnswer";
import QuestionCard from "./question-card/QuestionCard";

import "./QuestionsTest.scss";

class QuestionsTest extends React.Component<{}, {}> {
  public render() {
    const question = "Br";
    const answers = [
      {
        answer: "+1 +5",
        right: false
      },
      {
        answer: "+1",
        right: false
      },
      {
        answer: "+2 +4 +6 / -2",
        right: false
      },
      {
        answer: "+1 +3 +5 +7 / -1",
        right: true
      }
    ];

    return (
      <div className="questions-test">
        <QuestionCard
          question="Br"
          answers={answers}
          onAnswerClick={this.onAnswerClick}
        />
      </div>
    );
  }

  private onAnswerClick(answer: IQuestionCardAnswer) {
    return;
  }
}

export default QuestionsTest;
