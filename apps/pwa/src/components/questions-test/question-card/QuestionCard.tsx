import classNames from "classnames";
import * as React from "react";
import Card from "@/components/shared/card/Card";
import QuestionCardAnswer, {
  Answer,
} from "./question-card-answer/QuestionCardAnswer";
import "./QuestionCard.scss";

export interface Question {
  question: string;
  answers: Answer[];
  questionClass?: string;
}

interface QuestionCardProps {
  title: string;
  question: Question;
  onAnswerClick?: (answer: Answer) => void;
}

function QuestionCard({ question, title, onAnswerClick }: QuestionCardProps) {
  const onQuestionCardAnswerClickListener = React.useCallback(
    (answer: Answer) => {
      return () => onAnswerClick?.(answer);
    },
    [onAnswerClick]
  );

  return (
    <Card className="question-card">
      <div className="question-card__title">{title}</div>

      <div
        className={classNames(
          "question-card__question",
          {
            "question-card__question--not-styled": !question.questionClass,
          },
          question.questionClass
        )}
        aria-live="polite"
        data-testid="question-title"
      >
        {question.question}
      </div>

      <div className="question-card__answers">
        {question.answers.map((answer, index) => (
          <QuestionCardAnswer
            key={answer.answer}
            answer={answer}
            onClick={onQuestionCardAnswerClickListener(answer)}
            index={index}
          />
        ))}
      </div>
    </Card>
  );
}

export default QuestionCard;
