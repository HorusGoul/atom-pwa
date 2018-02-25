import autobind from "autobind-decorator";
import * as classNames from "classnames";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ElementManager from "../../ElementManager";
import PeriodicTable from "../periodic-table/PeriodicTable";
import PtElementInfo from "../pt-element/PtElementInfo";
import Navbar from "../shared/navbar/Navbar";
import "./PeriodicTablePage.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

@autobind
class PeriodicTablePage extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="periodic-table-page">
        <Navbar
          title="Periodic Table"
          className="periodic-table-page__navbar"
          backButton={true}
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        <div className="periodic-table-page__table">
          <PeriodicTable elementRenderer={this.elementRenderer} />
        </div>
      </div>
    );
  }

  private elementRenderer(atomic: number): JSX.Element {
    const element = ElementManager.getElement(atomic);

    return <PtElementInfo element={element} />;
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }
}

export default withRouter<Props>(PeriodicTablePage);
