import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Button from "../shared/button/Button";

import "./MainMenu.scss";
import MenuEntry, { IMenuEntry } from "./menu-entry/MenuEntry";

type Props = RouteComponentProps<any> & React.Props<any>;

@autobind
class MainMenu extends React.Component<Props, {}> {
  private menuEntries: IMenuEntry[] = [
    {
      icon: "test-tube",
      name: "Tests",
      route: ""
    },
    {
      icon: "periodic-table",
      name: "Periodic Table",
      route: ""
    },
    {
      icon: "scale-balance",
      name: "Mass Calculator",
      route: ""
    },
    {
      icon: "info",
      name: "About",
      route: ""
    }
  ];

  public render() {
    return (
      <div className="main-menu">
        <div className="main-menu__entries">
          {this.menuEntries.map((menuEntry, index) => (
            <MenuEntry key={index} {...menuEntry} />
          ))}
        </div>
      </div>
    );
  }

  private goTo(route: string) {
    const { history } = this.props;
  }
}

export default withRouter<Props>(MainMenu);
