import * as React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "../../Locale";
import { MAIN_MENU } from "../../routes";
import Button from "../shared/button/Button";
import "./NotFound.scss";

function NotFound() {
  const history = useHistory();

  const goHome = React.useCallback(() => history.push(MAIN_MENU), [history]);

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
