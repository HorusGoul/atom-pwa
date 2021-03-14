import * as React from "react";
import { useHistory } from "react-router-dom";
import AppSettings, { ITestElementSettings } from "../../AppSettings";
import { IElement } from "../../Element";
import ElementManager from "../../ElementManager";
import { i18n } from "../../Locale";
import { TEST_SELECTION } from "../../routes";
import { shuffle } from "../../utils/shuffle";
import { Answer } from "../questions-test/question-card/question-card-answer/QuestionCardAnswer";
import { Question } from "../questions-test/question-card/QuestionCard";
import QuestionsTest from "../questions-test/QuestionsTest";
import Card from "../shared/card/Card";
import Navbar from "../shared/navbar/Navbar";
import TestResults from "../test-results/TestResults";
import { getValencesTestSettings } from "./settings/ValencesTestSettings";
import "./ValencesTest.scss";

interface IValencesTestQuestionCard extends Question {
  data: IElement;
}

interface IValencesTestState {
  questions: IValencesTestQuestionCard[];
  right: IValencesTestQuestionCard[];
  wrong: IValencesTestQuestionCard[];
}

function ValencesTest() {
  const settings = React.useRef(getValencesTestSettings() || []).current;

  function createAnswer(answer: string, right = false): Answer {
    return {
      answer,
      right,
    };
  }

  function createQuestionAnswers(element: IElement): Answer[] {
    const rightAnswer = createAnswer(element.valency, true);
    const wrongAnswerPool = shuffle(element.wrongValences)
      .map((wrongValency) => createAnswer(wrongValency))
      .slice(0, 3);

    return shuffle([rightAnswer, ...wrongAnswerPool]);
  }

  function createQuestion(element: IElement): IValencesTestQuestionCard {
    return {
      answers: createQuestionAnswers(element),
      data: element,
      question: element.symbol,
      questionClass: `valences-test__question element ${element.group}`,
    };
  }

  function createTestQuestions() {
    const questions = settings!
      .elements!.filter((element) => element.enabled)
      .map((element) => ElementManager.getElement(element.atomic))
      .map((element) => createQuestion(element!));

    return shuffle(questions);
  }

  const [quiz, setQuiz] = React.useState<IValencesTestState>(() => ({
    questions: createTestQuestions(),
    right: [],
    wrong: [],
  }));

  const { questions, wrong, right } = quiz;

  const hasQuestions = !!questions.length;

  function onQuestionAnswer(
    question: IValencesTestQuestionCard,
    answer: Answer
  ) {
    const elementSetting = settings.elements!.find(
      (element: ITestElementSettings) => element.atomic === question.data.atomic
    );
    if (!elementSetting) return;

    const alreadyAnswered = isAlreadyAnswered(question);

    if (!alreadyAnswered) {
      elementSetting.stats.times++;

      if (answer.right) {
        elementSetting.stats.right++;
        addRightAnsweredQuestion(question);
      } else {
        elementSetting.stats.wrong++;
        addWrongAnsweredQuestion(question);
      }
    }

    if (answer.right) {
      removeQuestion(question);
    }

    AppSettings.save();
  }

  function updateQuiz(newState: Partial<IValencesTestState>) {
    setQuiz((oldQuiz) => {
      return { ...oldQuiz, ...newState };
    });
  }

  const history = useHistory();

  function onNavbarBackButtonClick() {
    history.push(TEST_SELECTION);
  }

  function isAlreadyAnswered(question: IValencesTestQuestionCard): boolean {
    return [...right, ...wrong].indexOf(question) !== -1;
  }

  function addRightAnsweredQuestion(question: IValencesTestQuestionCard) {
    updateQuiz({
      right: [...right, question],
    });
  }

  function addWrongAnsweredQuestion(question: IValencesTestQuestionCard) {
    updateQuiz({
      wrong: [...wrong, question],
    });
  }

  function removeQuestion(question: IValencesTestQuestionCard) {
    updateQuiz({
      questions: questions.filter((value) => value !== question),
    });
  }

  function clearWrongResults() {
    updateQuiz({
      wrong: [],
    });
  }

  function clearRightResults() {
    updateQuiz({
      right: [],
    });
  }

  function clearResults() {
    clearWrongResults();
    clearRightResults();
  }

  function repeatTest() {
    clearResults();
    updateQuiz({ questions: createTestQuestions() });
  }

  function repeatWrongAnswers() {
    updateQuiz({
      questions: shuffle(wrong),
    });

    clearWrongResults();
  }

  return (
    <div className="valences-test">
      <Navbar
        title={i18n("valences_test")}
        backButton={true}
        onBackButtonClick={onNavbarBackButtonClick}
      />

      {hasQuestions && (
        <div className="valences-test__test">
          <QuestionsTest
            title={i18n("select_valence")}
            questions={questions}
            // @ts-ignore Fix types
            onQuestionAnswer={onQuestionAnswer}
          />
        </div>
      )}

      {!hasQuestions && (
        <div className="valences-test__result">
          <Card className="valences-test__result-card">
            <TestResults
              gaTestName="Valences Test"
              wrongAnswers={wrong.length}
              rightAnswers={right.length}
              onRepeat={repeatTest}
              onRepeatWrongAnswers={repeatWrongAnswers}
            />
          </Card>
        </div>
      )}
    </div>
  );
}

export default ValencesTest;
