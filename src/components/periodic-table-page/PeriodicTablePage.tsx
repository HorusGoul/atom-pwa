import * as React from "react";
import { useHistory } from "react-router-dom";
import { Element } from "@/Element";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import { HUB } from "@/routes";
import PeriodicTable from "../periodic-table/PeriodicTable";
import PtElementInfo from "../pt-element/PtElementInfo";
import Navbar from "../shared/navbar/Navbar";
import SwipeableModal from "../shared/swipeable-modal/SwipeableModal";
import ElementInfo from "./element-info/ElementInfo";
import "./PeriodicTablePage.scss";

interface ElementInfoState {
  element: Element;
  open: boolean;
}

function PeriodicTablePage() {
  const history = useHistory();
  const { i18n } = useLocale();
  const { getElement } = useElements();

  const [elementInfo, setElementInfo] = React.useState<ElementInfoState>(
    () => ({
      element: getElement(1) as Element,
      open: false,
    })
  );

  const openElementInfo = (element: Element) => {
    setElementInfo({
      element,
      open: true,
    });
  };

  const closeElementInfo = () => {
    setElementInfo((info) => ({
      ...info,
      open: false,
    }));
  };

  const onNavbarBackButtonClick = () => {
    history.push(HUB);
  };

  const elementRenderer = (atomic: number) => {
    const element = getElement(atomic);
    if (!element) {
      return null;
    }
    return (
      <PtElementInfo
        element={element}
        onClick={(element: Element) => {
          openElementInfo(element);
        }}
      />
    );
  };

  return (
    <div className="periodic-table-page">
      <Navbar
        title={i18n("periodic_table")}
        className="periodic-table-page__navbar"
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
