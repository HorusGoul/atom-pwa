import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IElement } from "../../Element";
import ElementManager from "../../ElementManager";
import PeriodicTable, {
  IPeriodicTableElement
} from "../periodic-table/PeriodicTable";
import PtElementTest from "../pt-element/PtElementTest";
import Navbar from "../shared/navbar/Navbar";
import "./PeriodicTableTest.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

@autobind
class PeriodicTableTest extends React.Component<Props, {}> {
  private ptElements: Map<number, PtElementTest> = new Map();

  public render() {
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
      </div>
    );
  }

  private elementRenderer(atomic: number): IPeriodicTableElement {
    return {
      component: PtElementTest,
      props: {
        discovered: false,
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
    this.discoverElement(element);
  }

  private discoverElement(element: IElement) {
    const ptElement = this.ptElements.get(element.atomic);
    ptElement.discover();
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }
}

export default withRouter<Props>(PeriodicTableTest);
