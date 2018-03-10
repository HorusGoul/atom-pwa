import * as React from "react";
import * as ReactGA from "react-ga";
import { RouteComponentProps } from "react-router-dom";
import { SCREEN_NAME } from "./routes";

// tslint:disable-next-line:no-var-requires
const packageConfig = require("../package.json");

const config = {
  appName: packageConfig.name,
  gaCode: "UA-63127343-2",
  version: packageConfig.version
};

ReactGA.initialize(config.gaCode);
ReactGA.set({
  appName: config.appName,
  appVersion: config.version
});

type AnalyticsProps = RouteComponentProps<any>;
export const Analytics: React.StatelessComponent<AnalyticsProps> = ({
  location
}) => {
  const page = location.pathname + location.search;

  ReactGA.set({ page });
  ReactGA.pageview(page);
  ReactGA.ga()("send", "screenview", {
    screenName: SCREEN_NAME[location.pathname]
  });

  return null;
};
