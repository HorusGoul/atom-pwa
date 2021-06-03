import * as React from "react";
import Icon from "../shared/icon/Icon";
import "./RateApp.scss";
import { useLocale } from "@/hooks/useLocale";
import SwipeableModal from "../shared/swipeable-modal/SwipeableModal";
import Button from "../shared/button/Button";
import NativeBridge from "@/NativeBridge";
import classNames from "classnames";
import { logEvent } from "@/services/spycat";

export interface RateAppConfig {
  timesLaunched: number;
  rated: boolean;
}

const RATE_APP_STORAGE_KEY = "atom:rate_app";
const MINIMUM_TIMES_LAUNCHED = 3;

function RateApp() {
  const { i18n } = useLocale();
  const [open, setOpen] = React.useState(false);
  const [config, setConfig] = React.useState<RateAppConfig>(() => {
    const json = localStorage.getItem(RATE_APP_STORAGE_KEY);

    if (!json) {
      return {
        timesLaunched: 0,
        rated: false,
      };
    }

    return JSON.parse(json);
  });

  React.useEffect(() => {
    localStorage.setItem(RATE_APP_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  React.useEffect(() => {
    setConfig((current) => ({
      ...current,
      timesLaunched: current.timesLaunched + 1,
    }));
  }, []);

  if (
    !NativeBridge.isHybrid() ||
    config.timesLaunched < MINIMUM_TIMES_LAUNCHED ||
    config.rated
  ) {
    return null;
  }

  function rateApp() {
    if (/android/i.test(navigator.userAgent)) {
      window.open("market://details?id=tk.horusgoul.valenciasquimicas");

      setConfig((current) => ({
        ...current,
        rated: true,
      }));

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
