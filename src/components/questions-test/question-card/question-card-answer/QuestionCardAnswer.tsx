import autobind from "autobind-decorator";
import classNames from "classnames";
import * as React from "react";
import Button, { ButtonProps } from "../../../shared/button/Button";

import "./QuestionCardAnswer.scss";

export interface IQuestionCardAnswer {
  answer: string;
  right: boolean;
}

interface IQuestionCardAnswerProps extends Omit<ButtonProps, "children"> {
  answer: IQuestionCardAnswer;
}

interface IQuestionCardAnswerState {
  clicked: boolean;
}

@autobind
class QuestionCardAnswer extends React.Component<
  IQuestionCardAnswerProps,
  IQuestionCardAnswerState
> {
  public state: IQuestionCardAnswerState = {
    clicked: false,
  };

  public UNSAFE_componentWillReceiveProps(nextProps: IQuestionCardAnswerProps) {
    if (nextProps.answer !== this.props.answer) {
      this.setState({
        clicked: false,
      });
    }
  }

  public render() {
    const { answer, right } = this.props.answer;
    const { clicked } = this.state;

    const answerClass = classNames("question-card-answer", {
      "question-card-answer--clicked": clicked,
      "question-card-answer--wrong": clicked && !right,
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
      clicked: true,
    });

    if (onClick) {
      onClick();
    }
  }
}

export default QuestionCardAnswer;
