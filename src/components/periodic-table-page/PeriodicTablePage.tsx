import * as React from "react";
import { useHistory } from "react-router-dom";
import { IElement } from "../../Element";
import ElementManager from "../../ElementManager";
import { i18n } from "../../Locale";
import { MAIN_MENU } from "../../routes";
import PeriodicTable, {
  IPeriodicTableElement,
} from "../periodic-table/PeriodicTable";
import PtElementInfo from "../pt-element/PtElementInfo";
import Navbar from "../shared/navbar/Navbar";
import SwipeableModal from "../shared/swipeable-modal/SwipeableModal";
import ElementInfo from "./element-info/ElementInfo";
import "./PeriodicTablePage.scss";

interface IPeriodicTablePageState {
  elementInfo: {
    element: IElement;
    open: boolean;
  };
}

function PeriodicTablePage() {
  const history = useHistory();

  const [state, setState] = React.useState<IPeriodicTablePageState>(() => ({
    elementInfo: {
      element: ElementManager.getElement(1) as IElement,
      open: false,
    },
  }));

  const openElementInfo = (element: IElement) => {
    setState((state) => ({
      ...state,
      elementInfo: {
        element,
        open: true,
      },
    }));
  };

  const closeElementInfo = () => {
    const { elementInfo } = state;
    setState((state) => ({
      ...state,
      elementInfo: {
        ...elementInfo,
        open: false,
      },
    }));
  };

  const onNavbarBackButtonClick = () => {
    history.push(MAIN_MENU);
  };

  const elementRenderer = (atomic: number): IPeriodicTableElement => {
    return {
      // @ts-ignore fix this
      component: PtElementInfo,
      props: {
        element: ElementManager.getElement(atomic),
        onClick: (element: IElement) => {
          openElementInfo(element);
        },
      },
    };
  };

  const { elementInfo } = state;

  return (
    <div className="periodic-table-page">
      <Navbar
        title={i18n("periodic_table")}
        className="periodic-table-page__navbar"
        backButton={true}
        onBackButtonClick={onNavbarBackButtonClick}
      />

      <div className="periodic-table-page__table">
        <PeriodicTable elementRenderer={elementRenderer} />
      </div>

      <SwipeableModal
        className="periodic-table-page__modal-element-info"
        open={elementInfo.open}
        onClose={closeElementInfo}
      >
        <ElementInfo element={elementInfo.element} />
      </SwipeableModal>
    </div>
  );
}

export default PeriodicTablePage;
