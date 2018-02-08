import * as React from "react";

import Card from "../../shared/card/Card";
import QuestionCardAnswer, {
  IQuestionCardAnswer
} from "./question-card-answer/QuestionCardAnswer";

import "./QuestionCard.scss";

interface IQuestionCard {
  question: string;
  answers: IQuestionCardAnswer[];
}

class QuestionCard extends React.Component<{}, {}> {
  public render() {
    return (
      <Card className="question-card">
        <div className="question-card__title">Select the correct valence:</div>

        <div className="question-card__question">Br</div>

        <div className="question-card__answers">
          <QuestionCardAnswer answer="+1 +5" right={false} />
          <QuestionCardAnswer answer="+1" right={false} />
          <QuestionCardAnswer answer="+2 +4 +6 / -2" right={false} />
          <QuestionCardAnswer answer="+1 +3 +5 +7 / -1" right={true} />
        </div>
      </Card>
    );
  }
}

export default QuestionCard;
