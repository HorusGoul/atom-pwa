import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import QuestionsTest from "../questions-test/QuestionsTest";
import Navbar from "../shared/navbar/Navbar";

import "./ValencesTest.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

@autobind
class ValencesTest extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="valences-test">
        <Navbar
          title="Valences Test"
          backButton={true}
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        <div className="valences-test__test">
          <QuestionsTest />
        </div>
      </div>
    );
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }
}

export default withRouter<Props>(ValencesTest);
