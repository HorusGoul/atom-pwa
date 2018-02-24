import autobind from "autobind-decorator";
import * as classNames from "classnames";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ElementManager from "../../ElementManager";
import PeriodicTable from "../periodic-table/PeriodicTable";
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

    const elementClass = classNames("pt-element", "element", element.group);

    return (
      <div className={elementClass}>
        <div className="pt-element__atomic">{element.atomic}</div>

        <div className="pt-element__symbol">{element.symbol}</div>

        <div className="pt-element__name">{element.name}</div>
      </div>
    );
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }
}

export default withRouter<Props>(PeriodicTablePage);
