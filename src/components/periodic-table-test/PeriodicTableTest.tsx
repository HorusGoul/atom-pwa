import autobind from "autobind-decorator";
import classNames from "classnames";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AppSettings, { IPeriodicTableTestSettings } from "../../AppSettings";
import { IElement } from "../../Element";
import ElementManager from "../../ElementManager";
import { i18n } from "../../Locale";
import { TEST_SELECTION } from "../../routes";
import { shuffle } from "../../utils/shuffle";
import PeriodicTable from "../periodic-table/PeriodicTable";
import PtElementTest from "../pt-element/PtElementTest";
import Button from "../shared/button/Button";
import Card from "../shared/card/Card";
import Navbar from "../shared/navbar/Navbar";
import SwipeableModal from "../shared/swipeable-modal/SwipeableModal";
import TestResults from "../test-results/TestResults";
import "./PeriodicTableTest.scss";
import { getPeriodicTableTestSettings } from "./settings/PeriodicTableTestSettings";

interface IPeriodicTableTestQuestion {
  element: IElement;
}

type Props = RouteComponentProps<any> & React.Props<any>;

interface IPeriodicTableTestState {
  questions: IPeriodicTableTestQuestion[];
  questionModalOpen: boolean;
  right: IPeriodicTableTestQuestion[];
  wrong: IPeriodicTableTestQuestion[];
}

@autobind
class PeriodicTableTest extends React.Component<
  Props,
  IPeriodicTableTestState
> {
  public state: IPeriodicTableTestState = {
    questionModalOpen: true,
    questions: [],
    right: [],
    wrong: [],
  };

  private settings: IPeriodicTableTestSettings = getPeriodicTableTestSettings();

  private ptElements: Map<number, PtElementTest> = new Map();

  public componentDidMount() {
    this.createTestQuestions();
  }

  public render() {
    const { questionModalOpen, questions, right, wrong } = this.state;
    const currentQuestion = questions.length ? questions[0] : null;

    return (
      <div className="periodic-table-test">
        <Navbar
          title="Periodic Table Test"
          className="periodic-table-test__navbar"
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        {currentQuestion && (
          <div className="periodic-table-test__table">
            <PeriodicTable elementRenderer={this.elementRenderer} />
          </div>
        )}

        {!currentQuestion && (
          <div className="periodic-table-test__result">
            <Card className="periodic-table-test__result-card">
              <TestResults
                gaTestName="Periodic Table Test"
                wrongAnswers={wrong.length}
                rightAnswers={right.length}
                onRepeat={this.repeatTest}
                onRepeatWrongAnswers={this.repeatWrongAnswers}
              />
            </Card>
          </div>
        )}

        <SwipeableModal
          className="periodic-table-test__modal-question"
          open={questionModalOpen}
          onClose={this.closeQuestionModal}
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
              onClick={this.openQuestionModal}
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

  private elementRenderer(atomic: number) {
    const element = ElementManager.getElement(atomic);
    if (!element) return null;
    return (
      <PtElementTest
        discovered={!this.isElementInQuestions(element)}
        element={element}
        onClick={this.elementOnClick}
        ref={(ptElement: PtElementTest) => this.setPtElement(atomic, ptElement)}
      />
    );
  }

  private setPtElement(atomic: number, ptElement: PtElementTest) {
    this.ptElements.set(atomic, ptElement);
  }

  private elementOnClick(element: IElement) {
    this.onUserAnswer(element);
  }

  private onUserAnswer(element: IElement) {
    if (!this.isElementInQuestions(element)) {
      return;
    }

    const currentQuestion = this.getCurrentQuestion();
    const alreadyAnswered = this.isAlreadyAnswered(currentQuestion!);
    const rightAnswer = this.isAnswerRight(element);

    if (!alreadyAnswered) {
      const elementSetting = this.settings.elements?.find(
        (setting) => setting.atomic === currentQuestion?.element.atomic
      );

      elementSetting!.stats.times++;

      if (rightAnswer) {
        elementSetting!.stats.right++;
        this.addRightAnsweredQuestion(currentQuestion!);
      } else {
        elementSetting!.stats.wrong++;
        this.addWrongAnsweredQuestion(currentQuestion!);
      }

      AppSettings.save();
    }

    if (rightAnswer) {
      this.onRightAnswer(element);
    } else {
      this.onWrongAnswer(element);
    }
  }

  private onRightAnswer(element: IElement) {
    this.discoverElement(element);
    this.removeCurrentQuestion();
  }

  private onWrongAnswer(element: IElement) {
    this.showErrorInElement(element);
  }

  private removeCurrentQuestion() {
    const { questions } = this.state;
    const currentQuestion = questions[0];

    this.setState({
      questions: questions.filter((question) => question !== currentQuestion),
    });
  }

  private discoverElement(element: IElement) {
    const ptElement = this.ptElements.get(element.atomic);
    ptElement?.discover();
  }

  private showErrorInElement(element: IElement) {
    const ptElement = this.ptElements.get(element.atomic);
    ptElement?.showError();
  }

  private isAnswerRight(element: IElement): boolean {
    const currentQuestion = this.getCurrentQuestion();

    if (!currentQuestion) {
      return false;
    }

    const currentElement = currentQuestion.element;
    if (currentElement.atomic === element.atomic) {
      return true;
    }

    return false;
  }

  private getCurrentQuestion(): IPeriodicTableTestQuestion | null {
    const { questions } = this.state;
    return questions.length ? questions[0] : null;
  }

  private isElementInQuestions(element: IElement): boolean {
    const { questions } = this.state;

    return !!questions.find(
      (question) => question.element.atomic === element.atomic
    );
  }

  private createTestQuestions() {
    const questions = this.settings
      .elements!.filter((element) => element.enabled)
      .map((elementSetting) => ElementManager.getElement(elementSetting.atomic))
      .map((element) => this.createQuestion(element!));

    this.setState({
      questions: shuffle(questions),
    });
  }

  private createQuestion(element: IElement): IPeriodicTableTestQuestion {
    return {
      element,
    };
  }

  private openQuestionModal() {
    this.setState({
      questionModalOpen: true,
    });
  }

  private closeQuestionModal() {
    this.setState({
      questionModalOpen: false,
    });
  }

  private isAlreadyAnswered(question: IPeriodicTableTestQuestion): boolean {
    const { right, wrong } = this.state;
    return [...right, ...wrong].indexOf(question) !== -1;
  }

  private addRightAnsweredQuestion(question: IPeriodicTableTestQuestion) {
    const { right } = this.state;

    this.setState({
      right: [...right, question],
    });
  }

  private addWrongAnsweredQuestion(question: IPeriodicTableTestQuestion) {
    const { wrong } = this.state;

    this.setState({
      wrong: [...wrong, question],
    });
  }

  private clearWrongResults() {
    this.setState({
      wrong: [],
    });
  }

  private clearRightResults() {
    this.setState({
      right: [],
    });
  }

  private clearResults() {
    this.clearWrongResults();
    this.clearRightResults();
  }

  private repeatTest() {
    this.clearResults();
    this.createTestQuestions();
  }

  private repeatWrongAnswers() {
    const { wrong } = this.state;

    this.setState({
      questions: shuffle(wrong),
    });

    this.clearWrongResults();
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.push(TEST_SELECTION);
  }
}

export default withRouter<Props, React.ComponentType<Props>>(PeriodicTableTest);
