import * as React from "react";

import { Answer } from "./question-card/question-card-answer/QuestionCardAnswer";
import QuestionCard, { Question } from "./question-card/QuestionCard";

import "./QuestionsTest.scss";

interface QuestionTestProps {
  title: string;
  questions: Question[];
  onQuestionAnswer?: (question: Question, answer: Answer) => void;
}

function QuestionsTest({
  questions,
  title,
  onQuestionAnswer,
}: QuestionTestProps) {
  const onAnswerClickListener = React.useCallback(
    (question: Question) => {
      return (answer: Answer) => onQuestionAnswer?.(question, answer);
    },
    [onQuestionAnswer]
  );

  const hasQuestions = !!questions.length;

  return (
    <div className="questions-test">
      {hasQuestions && (
        <QuestionCard
          title={title}
          question={questions[0]}
          onAnswerClick={onAnswerClickListener(questions[0])}
        />
      )}
    </div>
  );
}

export default QuestionsTest;
