import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SCREEN_NAME } from "../routes";
import { send, setup } from "spycat";
import { APP_VERSION, COMMIT_SHORT_HASH, IS_DEVELOPMENT } from "../constants";

export function SpycatSetup() {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      // Enable spycat only on DEV mode for now
      setup({
        url: "/spycat",
        projectId: "atom-pt",
      });
    }
  }, []);

  useEffect(() => {
    logEvent("screen_view", {
      screen_name: SCREEN_NAME[location.pathname],
    });
  }, [location.pathname]);

  return null;
}

export function logEvent(type: string, params: Record<string, unknown> = {}) {
  params.app_version = APP_VERSION;
  params.commit_short_hash = COMMIT_SHORT_HASH;
  params.development = IS_DEVELOPMENT;

  send(type, params);
}
