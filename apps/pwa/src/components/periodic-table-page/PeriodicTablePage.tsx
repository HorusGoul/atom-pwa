import * as React from "react";
import { Route, useHistory, useParams } from "react-router-dom";
import { Element } from "@/Element";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import { HUB, PERIODIC_TABLE } from "@/routes";
import PeriodicTable from "../periodic-table/PeriodicTable";
import PtElementInfo from "../pt-element/PtElementInfo";
import Navbar from "../shared/navbar/Navbar";
import SwipeableModal from "../shared/swipeable-modal/SwipeableModal";
import ElementInfo from "./element-info/ElementInfo";
import "./PeriodicTablePage.scss";
import { useAddRecent } from "@/hooks/useRecent";

function PeriodicTablePage() {
  const history = useHistory();
  const { i18n } = useLocale();
  const { getElement } = useElements();

  useAddRecent("periodic-table");

  const onNavbarBackButtonClick = () => {
    history.push(HUB);
  };

  const elementRenderer = (atomic: number) => {
    const element = getElement(atomic);

    return (
      <PtElementInfo
        element={element}
        onClick={(element: Element) => {
          history.push(`${PERIODIC_TABLE}/${element.atomic}`);
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
        rightButton={{
          label: i18n("Search"),
          iconName: "search",
          onClick: () =>
            history.push({
              search: "openSearch=true",
            }),
        }}
      />

      <div className="periodic-table-page__table">
        <PeriodicTable elementRenderer={elementRenderer} />
      </div>

      <Route path={`${PERIODIC_TABLE}/:atomic`}>
        <ElementInfoView />
      </Route>
    </div>
  );
}

export default PeriodicTablePage;

function ElementInfoView() {
  const { getElement } = useElements();
  const { atomic } = useParams<{ atomic: string }>();
  const element = getElement(Number(atomic));
  const history = useHistory();

  return (
    <SwipeableModal
      className="periodic-table-page__modal-element-info"
      open={true}
      onClose={() => history.replace(PERIODIC_TABLE)}
    >
      <ElementInfo element={element} />
    </SwipeableModal>
  );
}
