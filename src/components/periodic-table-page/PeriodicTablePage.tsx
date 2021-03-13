import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IElement } from "../../Element";
import ElementManager from "../../ElementManager";
import { i18n } from "../../Locale";
import { MAIN_MENU } from "../../routes";
import PeriodicTable from "../periodic-table/PeriodicTable";
import PtElementInfo from "../pt-element/PtElementInfo";
import Navbar from "../shared/navbar/Navbar";
import SwipeableModal from "../shared/swipeable-modal/SwipeableModal";
import ElementInfo from "./element-info/ElementInfo";
import "./PeriodicTablePage.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

interface IPeriodicTablePageState {
  elementInfo: {
    element: IElement;
    open: boolean;
  };
}

@autobind
class PeriodicTablePage extends React.Component<
  Props,
  IPeriodicTablePageState
> {
  public state: IPeriodicTablePageState = {
    elementInfo: {
      element: ElementManager.getElement(1) as IElement,
      open: false,
    },
  };

  private ptElements: Map<number, PtElementInfo> = new Map();

  public render() {
    const { elementInfo } = this.state;

    return (
      <div className="periodic-table-page">
        <Navbar
          title={i18n("periodic_table")}
          className="periodic-table-page__navbar"
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        <div className="periodic-table-page__table">
          <PeriodicTable elementRenderer={this.elementRenderer} />
        </div>

        <SwipeableModal
          className="periodic-table-page__modal-element-info"
          open={elementInfo.open}
          onClose={this.closeElementInfo}
        >
          <ElementInfo element={elementInfo.element} />
        </SwipeableModal>
      </div>
    );
  }

  private elementRenderer(atomic: number) {
    return (
      <PtElementInfo
        element={ElementManager.getElement(atomic) as IElement}
        onClick={this.elementOnClick}
      />
    );
  }

  private elementOnClick(element: IElement) {
    this.openElementInfo(element);
  }

  private openElementInfo(element: IElement) {
    this.setState({
      elementInfo: {
        element,
        open: true,
      },
    });
  }

  private closeElementInfo() {
    const { elementInfo } = this.state;

    this.setState({
      elementInfo: {
        ...elementInfo,
        open: false,
      },
    });
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.push(MAIN_MENU);
  }
}

export default withRouter<Props, React.ComponentType<Props>>(PeriodicTablePage);
