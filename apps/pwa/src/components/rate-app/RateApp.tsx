import * as React from "react";
import Icon from "@/components/shared/icon/Icon";
import "./RateApp.scss";
import { useLocale } from "@/hooks/useLocale";
import SwipeableModal from "@/components/shared/swipeable-modal/SwipeableModal";
import Button from "@/components/shared/button/Button";
import NativeBridge from "@/NativeBridge";
import classNames from "classnames";
import { logEvent } from "@/services/spycat";
import { useRateApp } from "./useRateApp";

const MINIMUM_TIMES_LAUNCHED = 3;

function RateApp() {
  const { i18n } = useLocale();
  const [open, setOpen] = React.useState(false);
  const { config, setConfig, launchRateAppFlow } = useRateApp();

  React.useLayoutEffect(() => {
    setConfig((current) => ({
      ...current,
      timesLaunched: current.timesLaunched + 1,
    }));
  }, [setConfig]);

  if (
    !NativeBridge.isHybrid() ||
    config.timesLaunched < MINIMUM_TIMES_LAUNCHED ||
    config.rated
  ) {
    return null;
  }

  function rateApp() {
    if (/android/i.test(navigator.userAgent)) {
      launchRateAppFlow(true);

      logEvent("rating", {
        event_action: "Rated the app",
      });
    }

    setOpen(false);
  }

  function userOpenModal() {
    setOpen(true);

    logEvent("rating", {
      event_action: "Opened the RateApp modal",
    });
  }

  function userCloseModal() {
    setOpen(false);

    setConfig((current) => ({
      ...current,
      rated: true,
    }));
  }

  return (
    <>
      <Button
        className={classNames("rate-app", {
          "rate-app--animation": config.timesLaunched === 3,
        })}
        onClick={userOpenModal}
      >
        <Icon name="star" />

        <span className="rate-app__text">{i18n("rate_title")}</span>
      </Button>

      <SwipeableModal
        closeButton={true}
        title={i18n("rate_title")}
        open={open}
        onClose={userCloseModal}
        className="rate-app__modal"
      >
        <p className="rate-app__modal-text">{i18n("rate_this_app")}</p>

        <div className="rate-app__modal-footer">
          <Button onClick={userCloseModal}>
            <span>{i18n("rate_cancel")}</span>
          </Button>

          <Button className="rate-app__ok-button" onClick={rateApp}>
            <span>{i18n("rate_ok")}</span>
            <Icon name="arrow_forward" />
          </Button>
        </div>
      </SwipeableModal>
    </>
  );
}

export default RateApp;
