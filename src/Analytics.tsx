import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SCREEN_NAME } from "./routes";
import NativeBridge from "./NativeBridge";
import { send, setup } from "spycat";
import packageConfig from "../package.json";

const platformConfig = {
  app_name: packageConfig.name,
  app_version: packageConfig.version,
};

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    setup({
      url: "/spycat",
      projectId: "@",
    });
  }, []);

  useEffect(() => {
    logEvent("screen_view", {
      screen_name: SCREEN_NAME[location.pathname],
    });
  }, [location]);

  return null;
}

export function logEvent(type: string, params: Record<string, any> = {}) {
  params.app_name = platformConfig.app_name;
  params.app_version = platformConfig.app_version;

  send(type, params);
}
