import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { HUB } from "@/routes";
import Button from "../shared/button/Button";
import { logEvent } from "@/services/spycat";
import "./NotFound.scss";

function NotFound() {
  const navigate = useNavigate();
  const { i18n } = useLocale();

  const goHome = React.useCallback(() => navigate(HUB), [navigate]);

  React.useEffect(() => {
    logEvent("404", { path: window.location.pathname });
  }, []);

  return (
    <div className="not-found">
      <span className="not-found__404">404</span>

      <h1 className="not-found__text">{i18n("not_found_text")}</h1>

      <Button className="not-found__cta" onClick={goHome}>
        {i18n("home")}
      </Button>
    </div>
  );
}

export default NotFound;
