import autobind from "autobind-decorator";
import * as _ from "lodash";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AppSettings, { IValencesTestSettings } from "../../AppSettings";
import { IElement } from "../../Element";
import ElementManager from "../../ElementManager";
import { IQuestionCardAnswer } from "../questions-test/question-card/question-card-answer/QuestionCardAnswer";
import { IQuestionCard } from "../questions-test/question-card/QuestionCard";
import QuestionsTest from "../questions-test/QuestionsTest";
import Navbar from "../shared/navbar/Navbar";
import {
  getValencesTestSettings,
  setDefaultValencesTestSettings
} from "./settings/ValencesTestSettings";

import "./ValencesTest.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

interface IValencesTestQuestionCard extends IQuestionCard {
  data: IElement;
}

interface IValencesTestState {
  questions: IValencesTestQuestionCard[];
}

@autobind
class ValencesTest extends React.Component<Props, {}> {
  public state: IValencesTestState = {
    questions: []
  };

  private settings: IValencesTestSettings = getValencesTestSettings();

  public componentDidMount() {
    this.createTestQuestions();
  }

  public render() {
    const { questions } = this.state;

    return (
      <div className="valences-test">
        <Navbar
          title="Valences Test"
          backButton={true}
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        <div className="valences-test__test">
          <QuestionsTest
            questions={questions}
            onQuestionAnswer={this.onQuestionAnswer}
          />
        </div>
      </div>
    );
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }

  private onQuestionAnswer(
    question: IValencesTestQuestionCard,
    answer: IQuestionCardAnswer
  ) {
    const elementSetting = this.settings.elements.find(
      element => element.atomic === question.data.atomic
    );

    elementSetting.stats.times++;

    if (answer.right) {
      this.removeQuestion(question);
      elementSetting.stats.right++;
    } else {
      elementSetting.stats.wrong++;
    }

    AppSettings.save();
  }

  private removeQuestion(question: IValencesTestQuestionCard) {
    const { questions } = this.state;

    this.setState({
      questions: questions.filter(value => value !== question)
    });
  }

  private createTestQuestions() {
    const questions = this.settings.elements
      .filter(element => element.enabled)
      .map(element => ElementManager.getElement(element.atomic))
      .map(element => this.createQuestion(element));

    this.setState({
      questions: _.shuffle(questions)
    });
  }

  private createQuestion(element: IElement): IValencesTestQuestionCard {
    return {
      answers: this.createQuestionAnswers(element),
      data: element,
      question: element.symbol
    };
  }

  private createQuestionAnswers(element: IElement): IQuestionCardAnswer[] {
    const rightAnswer = this.createAnswer(element.valency, true);
    const wrongAnswerPool = _.shuffle(element.wrongValences)
      .map(wrongValency => this.createAnswer(wrongValency))
      .slice(0, 3);

    return _.shuffle([rightAnswer, ...wrongAnswerPool]);
  }

  private createAnswer(
    answer: string,
    right: boolean = false
  ): IQuestionCardAnswer {
    return {
      answer,
      right
    };
  }
}

export default withRouter<Props>(ValencesTest);
