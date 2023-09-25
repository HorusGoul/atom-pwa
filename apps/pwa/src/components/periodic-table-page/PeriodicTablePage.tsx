import * as React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Element } from "@/Element";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import { HUB, PERIODIC_TABLE } from "@/routes";
import PeriodicTable from "@/components/periodic-table/PeriodicTable";
import PtElementInfo from "@/components/pt-element/PtElementInfo";
import Navbar from "@/components/shared/navbar/Navbar";
import SwipeableModal from "@/components/shared/swipeable-modal/SwipeableModal";
import ElementInfo from "./element-info/ElementInfo";
import "./PeriodicTablePage.scss";
import { useAddRecent } from "@/hooks/useRecent";
import { usePreventDocumentOverscroll } from "@/hooks/usePreventDocumentOverscroll";

function PeriodicTablePage() {
  const navigate = useNavigate();
  const { i18n } = useLocale();
  const { getElement } = useElements();

  useAddRecent("periodic-table");
  usePreventDocumentOverscroll();

  const onNavbarBackButtonClick = () => {
    navigate(HUB);
  };

  const elementRenderer = (atomic: number) => {
    const element = getElement(atomic);

    return (
      <PtElementInfo
        element={element}
        onClick={(element: Element) => {
          navigate(`${PERIODIC_TABLE}/${element.atomic}`);
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
            navigate({
              search: "openSearch=true",
            }),
        }}
      />

      <div className="periodic-table-page__table">
        <PeriodicTable elementRenderer={elementRenderer} />
      </div>

      <Outlet />
    </div>
  );
}

export default PeriodicTablePage;

export function ElementInfoView() {
  const { getElement } = useElements();
  const { atomic } = useParams<{ atomic: string }>();
  const element = getElement(Number(atomic));
  const navigate = useNavigate();

  return (
    <SwipeableModal
      className="periodic-table-page__modal-element-info"
      open={true}
      onClose={() => navigate(PERIODIC_TABLE, { replace: true })}
    >
      <ElementInfo element={element} />
    </SwipeableModal>
  );
}
