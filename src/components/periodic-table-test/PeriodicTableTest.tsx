import autobind from "autobind-decorator";
import classNames = require("classnames");
import _ = require("lodash");
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AppSettings, { IPeriodicTableTestSettings } from "../../AppSettings";
import { IElement } from "../../Element";
import ElementManager from "../../ElementManager";
import PeriodicTable, {
  IPeriodicTableElement
} from "../periodic-table/PeriodicTable";
import PtElementTest from "../pt-element/PtElementTest";
import Button from "../shared/button/Button";
import Navbar from "../shared/navbar/Navbar";
import SwipeableModal from "../shared/swipeable-modal/SwipeableModal";
import "./PeriodicTableTest.scss";
import { getPeriodicTableTestSettings } from "./settings/PeriodicTableTestSettings";

interface IPeriodicTableTestQuestion {
  element: IElement;
}

type Props = RouteComponentProps<any> & React.Props<any>;

interface IPeriodicTableTestState {
  questions: IPeriodicTableTestQuestion[];
  questionModalOpen: boolean;
}

@autobind
class PeriodicTableTest extends React.Component<
  Props,
  IPeriodicTableTestState
> {
  public state: IPeriodicTableTestState = {
    questionModalOpen: true,
    questions: []
  };

  private settings: IPeriodicTableTestSettings = getPeriodicTableTestSettings();

  private ptElements: Map<number, PtElementTest> = new Map();

  public componentDidMount() {
    this.createTestQuestions();
  }

  public render() {
    const { questionModalOpen, questions } = this.state;
    const currentQuestion = questions.length ? questions[0] : null;

    return (
      <div className="periodic-table-test">
        <Navbar
          title="Periodic Table Test"
          className="periodic-table-test__navbar"
          backButton={true}
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        <div className="periodic-table-test__table">
          <PeriodicTable elementRenderer={this.elementRenderer} />
        </div>

        <SwipeableModal
          className="periodic-table-test__modal-question"
          open={questionModalOpen}
          onClose={this.closeQuestionModal}
          title="Complete the table"
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
            Place this element where it belongs to complete the periodic table
          </div>
        </SwipeableModal>

        {currentQuestion && (
          <Button
            className={classNames(
              "periodic-table-test__current-question",
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
        )}
      </div>
    );
  }

  private elementRenderer(atomic: number): IPeriodicTableElement {
    return {
      component: PtElementTest,
      props: {
        discovered: !this.isElementEnabled(atomic),
        element: ElementManager.getElement(atomic),
        onClick: this.elementOnClick,
        ref: (ptElement: PtElementTest) => this.setPtElement(atomic, ptElement)
      }
    };
  }

  private setPtElement(atomic: number, ptElement: PtElementTest) {
    this.ptElements.set(atomic, ptElement);
  }

  private elementOnClick(element: IElement) {
    this.onUserAnswer(element);
  }

  private onUserAnswer(element: IElement) {
    if (this.isAlreadyAnswered(element)) {
      return;
    }

    const currentQuestion = this.getCurrentQuestion();
    const elementSetting = this.settings.elements.find(
      setting => setting.atomic === currentQuestion.element.atomic
    );

    elementSetting.stats.times++;

    if (this.isAnswerRight(element)) {
      this.onRightAnswer(element);
      elementSetting.stats.right++;
    } else {
      this.onWrongAnswer(element);
      elementSetting.stats.wrong++;
    }

    AppSettings.save();
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
      questions: questions.filter(question => question !== currentQuestion)
    });
  }

  private discoverElement(element: IElement) {
    const ptElement = this.ptElements.get(element.atomic);
    ptElement.discover();
  }

  private showErrorInElement(element: IElement) {
    const ptElement = this.ptElements.get(element.atomic);
    ptElement.showError();
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

  private getCurrentQuestion(): IPeriodicTableTestQuestion {
    const { questions } = this.state;
    return questions.length ? questions[0] : null;
  }

  private isAlreadyAnswered(element: IElement): boolean {
    const { questions } = this.state;

    return !questions.filter(
      question => question.element.atomic === element.atomic
    ).length;
  }

  private isElementEnabled(atomic: number) {
    return this.settings.elements.find(
      elementSetting => elementSetting.atomic === atomic
    ).enabled;
  }

  private createTestQuestions() {
    const questions = this.settings.elements
      .filter(element => element.enabled)
      .map(elementSetting => ElementManager.getElement(elementSetting.atomic))
      .map(element => this.createQuestion(element));

    this.setState({
      questions: _.shuffle(questions)
    });
  }

  private createQuestion(element: IElement): IPeriodicTableTestQuestion {
    return {
      element
    };
  }

  private openQuestionModal() {
    this.setState({
      questionModalOpen: true
    });
  }

  private closeQuestionModal() {
    this.setState({
      questionModalOpen: false
    });
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }
}

export default withRouter<Props>(PeriodicTableTest);
