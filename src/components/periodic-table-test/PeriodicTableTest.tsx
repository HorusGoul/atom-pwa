import classNames from "classnames";
import * as React from "react";
import { useHistory } from "react-router-dom";
import AppSettings, { IPeriodicTableTestSettings } from "@/AppSettings";
import { Element } from "@/Element";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import { TEST_SELECTION } from "@/routes";
import { shuffle } from "@/utils/shuffle";
import PeriodicTable from "../periodic-table/PeriodicTable";
import PtElementTest from "../pt-element/PtElementTest";
import Button from "../shared/button/Button";
import Card from "../shared/card/Card";
import Navbar from "../shared/navbar/Navbar";
import SwipeableModal from "../shared/swipeable-modal/SwipeableModal";
import TestResults from "../test-results/TestResults";
import "./PeriodicTableTest.scss";
import { getPeriodicTableTestSettings } from "./settings/PeriodicTableTestSettings";

interface PeriodicTableTestQuestion {
  element: Element;
}

function PeriodicTableTest() {
  const history = useHistory();
  const { i18n } = useLocale();
  const { getElement } = useElements();

  const settings = React.useMemo(() => getPeriodicTableTestSettings(), []);

  function createTestQuestions(settings: IPeriodicTableTestSettings) {
    if (!settings.elements) return [];
    const questions = settings.elements
      .filter((element) => element.enabled)
      .map((elementSetting) => getElement(elementSetting.atomic))
      .map((element) => ({ element: element as Element }));

    return shuffle(questions);
  }

  const [questionModalOpen, setQuestionModalOpen] = React.useState(true);
  const [questions, setQuestions] = React.useState<PeriodicTableTestQuestion[]>(
    () => createTestQuestions(settings)
  );
  const [wrongAnswers, setWrongAnswers] = React.useState<
    PeriodicTableTestQuestion[]
  >([]);
  const [rightAnswers, setRightAnswers] = React.useState<
    PeriodicTableTestQuestion[]
  >([]);

  const currentQuestion = questions.length ? questions[0] : null;

  function onNavbarBackButtonClick() {
    history.push(TEST_SELECTION);
  }

  function elementRenderer(atomic: number) {
    const element = getElement(atomic);
    if (!element) return null;
    return (
      <PtElementTest
        discovered={!isElementInQuestions(element)}
        element={element}
        onClick={elementOnClick}
        shouldShowError={!isAnswerRight(element)}
      />
    );
  }

  function elementOnClick(element: Element) {
    onUserAnswer(element);
  }

  function onUserAnswer(element: Element) {
    if (!isElementInQuestions(element)) {
      return;
    }

    const currentQuestion = getCurrentQuestion();
    const alreadyAnswered = isAlreadyAnswered(
      currentQuestion as PeriodicTableTestQuestion
    );
    const rightAnswer = isAnswerRight(element);
    if (!settings.elements) return;
    if (!alreadyAnswered) {
      const elementSetting = settings.elements?.find(
        (setting) => setting.atomic === currentQuestion?.element.atomic
      );
      if (!elementSetting) return;
      elementSetting.stats.times++;

      if (rightAnswer) {
        elementSetting.stats.right++;
        addRightAnsweredQuestion(currentQuestion as PeriodicTableTestQuestion);
      } else {
        elementSetting.stats.wrong++;
        addWrongAnsweredQuestion(currentQuestion as PeriodicTableTestQuestion);
      }

      AppSettings.save();
    }

    if (rightAnswer) {
      removeCurrentQuestion();
    }
  }

  function removeCurrentQuestion() {
    const currentQuestion = questions[0];

    setQuestions(questions.filter((question) => question !== currentQuestion));
  }

  function isAnswerRight(element: Element): boolean {
    const currentQuestion = getCurrentQuestion();

    if (!currentQuestion) {
      return false;
    }

    const currentElement = currentQuestion.element;
    if (currentElement.atomic === element.atomic) {
      return true;
    }

    return false;
  }

  function getCurrentQuestion(): PeriodicTableTestQuestion | null {
    return questions.length ? questions[0] : null;
  }

  function isElementInQuestions(element: Element): boolean {
    return !!questions.find(
      (question) => question.element.atomic === element.atomic
    );
  }

  function openQuestionModal() {
    setQuestionModalOpen(true);
  }

  function closeQuestionModal() {
    setQuestionModalOpen(false);
  }

  function isAlreadyAnswered(question: PeriodicTableTestQuestion): boolean {
    return [...rightAnswers, ...wrongAnswers].indexOf(question) !== -1;
  }

  function addRightAnsweredQuestion(question: PeriodicTableTestQuestion) {
    setRightAnswers([...rightAnswers, question]);
  }

  function addWrongAnsweredQuestion(question: PeriodicTableTestQuestion) {
    setWrongAnswers([...wrongAnswers, question]);
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
    <div className="periodic-table-test">
      <Navbar
        title="Periodic Table Test"
        className="periodic-table-test__navbar"
        onBackButtonClick={onNavbarBackButtonClick}
      />

      {currentQuestion && (
        <div className="periodic-table-test__table">
          <PeriodicTable elementRenderer={elementRenderer} />
        </div>
      )}

      {!currentQuestion && (
        <div className="periodic-table-test__result">
          <Card className="periodic-table-test__result-card">
            <TestResults
              gaTestName="Periodic Table Test"
              wrongAnswers={wrongAnswers.length}
              rightAnswers={rightAnswers.length}
              onRepeat={repeatTest}
              onRepeatWrongAnswers={repeatWrongAnswers}
            />
          </Card>
        </div>
      )}

      <SwipeableModal
        className="periodic-table-test__modal-question"
        open={questionModalOpen}
        onClose={closeQuestionModal}
        title={i18n("complete_the_table")}
        closeButton={true}
      >
        {currentQuestion && (
          <div
            className={classNames(
              "periodic-table-test__modal-question__element",
              "element",
              currentQuestion.element.group
            )}
          >
            {currentQuestion.element.symbol}
          </div>
        )}

        <div className="periodic-table-test__modal-question__text">
          {i18n("complete_the_table_desc")}
        </div>
      </SwipeableModal>

      {currentQuestion && (
        <div className={classNames("periodic-table-test__current-question")}>
          <Button
            className={classNames(
              "periodic-table-test__current-question__button",
              "element",
              currentQuestion.element.group
            )}
            onClick={openQuestionModal}
          >
            {currentQuestion.element.symbol}

            <div className="periodic-table-test__current-question__label">
              ?
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}

export default PeriodicTableTest;
