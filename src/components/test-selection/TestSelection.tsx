import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Navbar from "../shared/navbar/Navbar";

import "./TestSelection.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

@autobind
class TestSelection extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="test-selection">
        <Navbar
          backButton={true}
          title="Tests"
          onBackButtonClick={this.onNavbarBackButtonClick}
        />
      </div>
    );
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }
}

export default withRouter<Props>(TestSelection);
