import * as React from "react";
import { useHistory } from "react-router-dom";
import { Element } from "@/Element";
import { ElementsSettings } from "@/hooks/useSettings";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import { TEST_SELECTION } from "@/routes";
import { shuffle } from "@/utils/shuffle";
import { Answer } from "../questions-test/question-card/question-card-answer/QuestionCardAnswer";
import { Question } from "../questions-test/question-card/QuestionCard";
import QuestionsTest from "../questions-test/QuestionsTest";
import Card from "../shared/card/Card";
import Navbar from "../shared/navbar/Navbar";
import TestResults from "../test-results/TestResults";
import { useValencesTestSettings } from "./hooks/useValencesTestSettings";
import "./ValencesTest.scss";
import { useAddRecent } from "@/hooks/useRecent";

interface ValencesTestQuestion extends Question {
  data: Element;
}

function createAnswer(answer: string, right = false): Answer {
  return {
    answer,
    right,
  };
}

function createQuestionAnswers(element: Element): Answer[] {
  const rightAnswer = createAnswer(element.valency, true);
  const wrongAnswerPool = shuffle(element.wrongValences)
    .map((wrongValency) => createAnswer(wrongValency))
    .slice(0, 3);

  return shuffle([rightAnswer, ...wrongAnswerPool]);
}

function createQuestion(element: Element): ValencesTestQuestion {
  return {
    answers: createQuestionAnswers(element),
    data: element,
    question: element.symbol,
    questionClass: `valences-test__question element ${element.group}`,
  };
}

function ValencesTest() {
  const { i18n } = useLocale();
  const { getElement } = useElements();
  const { settings, updateSettings } = useValencesTestSettings();

  useAddRecent("valency-quiz");

  function createTestQuestions(settings: ElementsSettings) {
    if (!settings.elements) {
      return [];
    }

    const questions = settings.elements
      .filter((element) => element.enabled)
      .map((element) => getElement(element.atomic))
      .map((element) => createQuestion(element as Element));

    return shuffle(questions);
  }

  const [questions, setQuestions] = React.useState<ValencesTestQuestion[]>(() =>
    createTestQuestions(settings)
  );
  const [wrongAnswers, setWrongAnswers] = React.useState<
    ValencesTestQuestion[]
  >([]);
  const [rightAnswers, setRightAnswers] = React.useState<
    ValencesTestQuestion[]
  >([]);

  const hasQuestions = !!questions.length;

  function onQuestionAnswer(question: ValencesTestQuestion, answer: Answer) {
    if (!settings.elements) return;
    const alreadyAnswered = isAlreadyAnswered(question);

    if (!alreadyAnswered) {
      updateSettings((settings) => {
        const elementSetting = settings.elements?.find(
          (element) => element.atomic === question.data.atomic
        );

        if (!elementSetting) {
          return;
        }

        elementSetting.stats.times++;

        if (answer.right) {
          elementSetting.stats.right++;
        } else {
          elementSetting.stats.wrong++;
        }
      });

      if (answer.right) {
        addRightAnsweredQuestion(question);
      } else {
        addWrongAnsweredQuestion(question);
      }
    }

    if (answer.right) {
      removeQuestion(question);
    }
  }

  const history = useHistory();

  function onNavbarBackButtonClick() {
    history.push(TEST_SELECTION);
  }

  function isAlreadyAnswered(question: ValencesTestQuestion): boolean {
    return [...rightAnswers, ...wrongAnswers].indexOf(question) !== -1;
  }

  function addRightAnsweredQuestion(question: ValencesTestQuestion) {
    setRightAnswers([...rightAnswers, question]);
  }

  function addWrongAnsweredQuestion(question: ValencesTestQuestion) {
    setWrongAnswers([...wrongAnswers, question]);
  }

  function removeQuestion(question: ValencesTestQuestion) {
    setQuestions(questions.filter((value) => value !== question));
  }

  function clearWrongResults() {
    setWrongAnswers([]);
  }

  function clearRightResults() {
    setRightAnswers([]);
  }

  function clearResults() {
    clearWrongResults();
    clearRightResults();
  }

  function repeatTest() {
    clearResults();
    setQuestions(createTestQuestions(settings));
  }

  function repeatWrongAnswers() {
    setQuestions(shuffle(wrongAnswers));
    clearWrongResults();
  }

  return (
    <div className="valences-test">
      <Navbar
        title={i18n("valences_test")}
        onBackButtonClick={onNavbarBackButtonClick}
      />

      {hasQuestions && (
        <div className="valences-test__test">
          <QuestionsTest
            title={i18n("select_valence")}
            questions={questions}
            onQuestionAnswer={onQuestionAnswer}
          />
        </div>
      )}

      {!hasQuestions && (
        <div className="valences-test__result">
          <Card className="valences-test__result-card">
            <TestResults
              gaTestName="Valences Test"
              wrongAnswers={wrongAnswers.length}
              rightAnswers={rightAnswers.length}
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
