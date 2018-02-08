import autobind from "autobind-decorator";
import * as classNames from "classnames";
import * as React from "react";
import Button, { IButtonProps } from "../../../shared/button/Button";

import "./QuestionCardAnswer.scss";

export interface IQuestionCardAnswer {
  answer: string;
  right: boolean;
}

type Props = IButtonProps & IQuestionCardAnswer;

interface IQuestionCardAnswerState {
  clicked: boolean;
}

@autobind
class QuestionCardAnswer extends React.Component<
  Props,
  IQuestionCardAnswerState
> {
  public state: IQuestionCardAnswerState = {
    clicked: false
  };

  public render() {
    const { answer, right } = this.props;
    const { clicked } = this.state;

    const answerClass = classNames("question-card-answer", {
      "question-card-answer--clicked": clicked,
      "question-card-answer--wrong": clicked && !right
    });

    return (
      <Button className={answerClass} onClick={this.onClick}>
        {answer}
      </Button>
    );
  }

  private onClick() {
    const { onClick } = this.props;

    this.setState({
      clicked: true
    });

    if (onClick) {
      onClick();
    }
  }
}

export default QuestionCardAnswer;
