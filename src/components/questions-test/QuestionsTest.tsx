import * as React from "react";

import { Answer } from "./question-card/question-card-answer/QuestionCardAnswer";
import QuestionCard, { Question } from "./question-card/QuestionCard";

import "./QuestionsTest.scss";

interface QuestionTestProps<TQuestion extends Question> {
  title: string;
  questions: TQuestion[];
  onQuestionAnswer?: (question: TQuestion, answer: Answer) => void;
}

function QuestionsTest<TQuestion extends Question>({
  questions,
  title,
  onQuestionAnswer,
}: QuestionTestProps<TQuestion>) {
  const onAnswerClickListener = React.useCallback(
    (question: TQuestion) => {
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
