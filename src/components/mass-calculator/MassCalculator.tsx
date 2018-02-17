import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";
import "./MassCalculator.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

@autobind
class MassCalculator extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="mass-calculator">
        <Navbar
          title="Mass Calculator"
          backButton={true}
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

export default withRouter<Props>(MassCalculator);
