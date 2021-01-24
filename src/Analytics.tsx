import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { SCREEN_NAME } from "./routes";
import NativeBridge from "./NativeBridge";

type AnalyticsProps = RouteComponentProps<any>;

export const Analytics = ({ location }: AnalyticsProps) => {
  useEffect(
    () => {
      NativeBridge.fa.logEvent("screen_view", {
        screen_name: SCREEN_NAME[location.pathname]
      });
    },
    [location]
  );

  return null;
};
