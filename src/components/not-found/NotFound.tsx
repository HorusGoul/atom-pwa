import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { i18n } from "../../Locale";
import { MAIN_MENU } from "../../routes";
import Button from "../shared/button/Button";
import "./NotFound.scss";

type Props = RouteComponentProps<any>;

@autobind
class NotFound extends React.Component<Props> {
  public render() {
    return (
      <div className="not-found">
        <span className="not-found__404">404</span>

        <h1 className="not-found__text">{i18n("not_found_text")}</h1>

        <Button className="not-found__cta" onClick={this.goHome}>
          {i18n("home")}
        </Button>
      </div>
    );
  }

  private goHome() {
    this.props.history.push(MAIN_MENU);
  }
}

export default withRouter<Props, React.ComponentType<Props>>(NotFound);
