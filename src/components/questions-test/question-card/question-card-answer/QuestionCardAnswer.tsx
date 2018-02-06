import * as React from "react";
import Button, { IButtonProps } from "../../../shared/button/Button";

import "./QuestionCardAnswer.scss";

type Props = IButtonProps;

const QuestionCardAnswer: React.StatelessComponent<Props> = ({
  onClick,
  children
}) => (
  <Button className="question-card-answer" onClick={onClick}>
    {children}
  </Button>
);

export default QuestionCardAnswer;
