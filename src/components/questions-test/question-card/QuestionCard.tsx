import autobind from "autobind-decorator";
import * as React from "react";

import Card from "../../shared/card/Card";
import QuestionCardAnswer, {
  IQuestionCardAnswer
} from "./question-card-answer/QuestionCardAnswer";

import "./QuestionCard.scss";

export interface IQuestionCard {
  question: string;
  answers: IQuestionCardAnswer[];
  data?: any;
}

interface IQuestionCardProps {
  question: IQuestionCard;
  onAnswerClick?: (answer: IQuestionCardAnswer) => void;
}

@autobind
class QuestionCard extends React.Component<IQuestionCardProps, {}> {
  public render() {
    const { question } = this.props;

    return (
      <Card className="question-card">
        <div className="question-card__title">Select the correct valence:</div>

        <div className="question-card__question">{question.question}</div>

        <div className="question-card__answers">
          {question.answers.map((answer, index) => (
            <QuestionCardAnswer
              key={index}
              answer={answer}
              onClick={this.onQuestionCardAnswerClickListener(answer)}
            />
          ))}
        </div>
      </Card>
    );
  }

  private onQuestionCardAnswerClickListener(answer: IQuestionCardAnswer) {
    return () => this.onQuestionCardAnswerClick(answer);
  }

  private onQuestionCardAnswerClick(answer: IQuestionCardAnswer) {
    if (this.props.onAnswerClick) {
      this.props.onAnswerClick(answer);
    }
  }
}

export default QuestionCard;
