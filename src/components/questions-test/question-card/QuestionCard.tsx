import * as React from "react";

import Card from "../../shared/card/Card";
import QuestionCardAnswer from "./question-card-answer/QuestionCardAnswer";

import "./QuestionCard.scss";

class QuestionCard extends React.Component<{}, {}> {
  public render() {
    return (
      <Card className="question-card">
        <div className="question-card__title">Select the correct valence:</div>

        <div className="question-card__question">Br</div>

        <div className="question-card__answers">
          <QuestionCardAnswer>+1 +5</QuestionCardAnswer>
          <QuestionCardAnswer>+1</QuestionCardAnswer>
          <QuestionCardAnswer>+2 +4 +6 / -2</QuestionCardAnswer>
          <QuestionCardAnswer>+1 +3 +5 +7 / -1</QuestionCardAnswer>
        </div>
      </Card>
    );
  }
}

export default QuestionCard;
