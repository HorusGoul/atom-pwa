import * as React from "react";
import Icon from "../shared/icon/Icon";
import "./DownloadApp.scss";
import { useLocale } from "@/hooks/useLocale";
import Button from "../shared/button/Button";
import classNames from "classnames";
import { logEvent } from "@/services/spycat";
import { useFlagStore } from "@/services/flags";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface DownloadAppConfig {
  timesLaunched: number;
  downloaded: boolean;
}

const DOWNLOAD_APP_STORAGE_KEY = "atom:download_app";

const initialValue: DownloadAppConfig = {
  timesLaunched: 0,
  downloaded: false,
};

function DownloadApp() {
  const { i18n } = useLocale();
  const flags = useFlagStore();
  const [config, setConfig] = useLocalStorage<DownloadAppConfig>(
    DOWNLOAD_APP_STORAGE_KEY,
    initialValue
  );

  React.useLayoutEffect(() => {
    setConfig((current) => ({
      ...current,
      timesLaunched: current.timesLaunched + 1,
    }));
  }, [setConfig]);

  if (
    !flags.showDownloadAppAndroid ||
    config.downloaded ||
    config.timesLaunched === 0
  ) {
    return null;
  }

  function downloadApp() {
    window.open(
      "https://play.google.com/store/apps/details?id=tk.horusgoul.valenciasquimicas&utm_source=Atom%20PWA&utm_medium=Atom%20Download%20App%20Button&utm_campaign=Atom"
    );

    setConfig((current) => ({
      ...current,
      downloaded: true,
    }));

    logEvent("download app click");
  }

  return (
    <Button
      className={classNames("download-app", {
        "download-app--animation": config.timesLaunched === 1,
      })}
      onClick={downloadApp}
    >
      <Icon name="star" />

      <span className="download-app__text">{i18n("download_title")}</span>
    </Button>
  );
}

export default DownloadApp;
