import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AppSettings, { IValencesTestSettings } from "../../AppSettings";
import { IElement } from "../../Element";
import ElementManager from "../../ElementManager";
import { i18n } from "../../Locale";
import { TEST_SELECTION } from "../../routes";
import { shuffle } from "../../utils/shuffle";
import { IQuestionCardAnswer } from "../questions-test/question-card/question-card-answer/QuestionCardAnswer";
import { IQuestionCard } from "../questions-test/question-card/QuestionCard";
import QuestionsTest from "../questions-test/QuestionsTest";
import Card from "../shared/card/Card";
import Navbar from "../shared/navbar/Navbar";
import TestResults from "../test-results/TestResults";
import { getValencesTestSettings } from "./settings/ValencesTestSettings";
import "./ValencesTest.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

interface IValencesTestQuestionCard extends IQuestionCard {
  data: IElement;
}

interface IValencesTestState {
  questions: IValencesTestQuestionCard[];
  right: IValencesTestQuestionCard[];
  wrong: IValencesTestQuestionCard[];
}

@autobind
class ValencesTest extends React.Component<Props> {
  public state: IValencesTestState = {
    questions: [],
    right: [],
    wrong: [],
  };

  private settings: IValencesTestSettings = getValencesTestSettings();

  public componentDidMount() {
    this.createTestQuestions();
  }

  public render() {
    const { questions, wrong, right } = this.state;
    const hasQuestions = !!questions.length;

    return (
      <div className="valences-test">
        <Navbar
          title={i18n("valences_test")}
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        {hasQuestions && (
          <div className="valences-test__test">
            <QuestionsTest
              title={i18n("select_valence")}
              questions={questions}
              // @ts-ignore Fix types
              onQuestionAnswer={this.onQuestionAnswer}
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
                onRepeat={this.repeatTest}
                onRepeatWrongAnswers={this.repeatWrongAnswers}
              />
            </Card>
          </div>
        )}
      </div>
    );
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.push(TEST_SELECTION);
  }

  private onQuestionAnswer(
    question: IValencesTestQuestionCard,
    answer: IQuestionCardAnswer
  ) {
    const elementSetting = this.settings.elements!.find(
      (element) => element.atomic === question.data.atomic
    );

    const alreadyAnswered = this.isAlreadyAnswered(question);

    if (!alreadyAnswered) {
      elementSetting!.stats.times++;

      if (answer.right) {
        elementSetting!.stats.right++;
        this.addRightAnsweredQuestion(question);
      } else {
        elementSetting!.stats.wrong++;
        this.addWrongAnsweredQuestion(question);
      }
    }

    if (answer.right) {
      this.removeQuestion(question);
    }

    AppSettings.save();
  }

  private removeQuestion(question: IValencesTestQuestionCard) {
    const { questions } = this.state;

    this.setState({
      questions: questions.filter((value) => value !== question),
    });
  }

  private createTestQuestions() {
    const questions = this.settings
      .elements!.filter((element) => element.enabled)
      .map((element) => ElementManager.getElement(element.atomic))
      .map((element) => this.createQuestion(element!));

    this.setState({
      questions: shuffle(questions),
    });
  }

  private createQuestion(element: IElement): IValencesTestQuestionCard {
    return {
      answers: this.createQuestionAnswers(element),
      data: element,
      question: element.symbol,
      questionClass: `valences-test__question element ${element.group}`,
    };
  }

  private createQuestionAnswers(element: IElement): IQuestionCardAnswer[] {
    const rightAnswer = this.createAnswer(element.valency, true);
    const wrongAnswerPool = shuffle(element.wrongValences)
      .map((wrongValency) => this.createAnswer(wrongValency))
      .slice(0, 3);

    return shuffle([rightAnswer, ...wrongAnswerPool]);
  }

  private createAnswer(answer: string, right = false): IQuestionCardAnswer {
    return {
      answer,
      right,
    };
  }

  private isAlreadyAnswered(question: IValencesTestQuestionCard): boolean {
    const { right, wrong } = this.state;
    return [...right, ...wrong].indexOf(question) !== -1;
  }

  private addRightAnsweredQuestion(question: IValencesTestQuestionCard) {
    const { right } = this.state;

    this.setState({
      right: [...right, question],
    });
  }

  private addWrongAnsweredQuestion(question: IValencesTestQuestionCard) {
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
}

export default withRouter<Props, React.ComponentType<Props>>(ValencesTest);
