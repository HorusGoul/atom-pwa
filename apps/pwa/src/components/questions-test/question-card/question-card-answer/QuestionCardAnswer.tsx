import classNames from "classnames";
import * as React from "react";
import Button, { ButtonProps } from "../../../shared/button/Button";

import "./QuestionCardAnswer.scss";

export interface Answer {
  answer: string;
  right: boolean;
}

interface QuestionCardAnswerProps extends Omit<ButtonProps, "children"> {
  answer: Answer;
  index: number;
}

function QuestionCardAnswer({
  answer: { answer, right },
  index,
  onClick,
}: QuestionCardAnswerProps) {
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    setClicked(false);
  }, [answer]);

  const onButtonClick = React.useCallback(() => {
    setClicked(true);
    onClick?.();
  }, [onClick]);

  const answerClass = classNames("question-card-answer", {
    "question-card-answer--clicked": clicked,
    "question-card-answer--wrong": clicked && !right,
  });

  return (
    <Button
      className={answerClass}
      onClick={onButtonClick}
      id={`question-answer-${index}`}
    >
      {answer}
    </Button>
  );
}

export default QuestionCardAnswer;
