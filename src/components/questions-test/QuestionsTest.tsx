import * as React from "react";

import { IQuestionCardAnswer } from "./question-card/question-card-answer/QuestionCardAnswer";
import QuestionCard, { IQuestionCard } from "./question-card/QuestionCard";

import "./QuestionsTest.scss";

interface IQuestionTestProps {
  title: string;
  questions: IQuestionCard[];
  onQuestionAnswer?: (
    question: IQuestionCard,
    answer: IQuestionCardAnswer
  ) => void;
}

class QuestionsTest extends React.Component<IQuestionTestProps, {}> {
  public render() {
    const { questions, title } = this.props;
    const hasQuestions = !!questions.length;

    return (
      <div className="questions-test">
        {hasQuestions && (
          <QuestionCard
            title={title}
            question={questions[0]}
            onAnswerClick={this.onAnswerClickListener(questions[0])}
          />
        )}
      </div>
    );
  }

  private onAnswerClickListener(question: IQuestionCard) {
    return (answer: IQuestionCardAnswer) =>
      this.onQuestionAnswerClick(question, answer);
  }

  private onQuestionAnswerClick(
    question: IQuestionCard,
    answer: IQuestionCardAnswer
  ) {
    if (this.props.onQuestionAnswer) {
      this.props.onQuestionAnswer(question, answer);
    }
  }
}

export default QuestionsTest;
