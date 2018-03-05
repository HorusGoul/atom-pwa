import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Button from "../shared/button/Button";

import { i18n } from "../../Locale";
import "./MainMenu.scss";
import MenuEntry, { IMenuEntry } from "./menu-entry/MenuEntry";

type Props = RouteComponentProps<any> & React.Props<any>;

@autobind
class MainMenu extends React.Component<Props, {}> {
  private menuEntries: IMenuEntry[] = [
    {
      icon: "test-tube",
      name: i18n("nav_test"),
      route: "/tests"
    },
    {
      icon: "periodic-table",
      name: i18n("periodic_table"),
      route: "/periodic-table"
    },
    {
      icon: "scale-balance",
      name: i18n("mass_calculator"),
      route: "/mass-calculator"
    },
    {
      icon: "info",
      name: i18n("nav_about"),
      route: "/about"
    }
  ];

  public render() {
    return (
      <div className="main-menu">
        <div className="main-menu__entries">
          {this.menuEntries.map((menuEntry, index) => (
            <MenuEntry
              key={index}
              {...menuEntry}
              onClick={this.onEntryClickListener(menuEntry)}
            />
          ))}
        </div>
      </div>
    );
  }

  private onEntryClickListener(menuEntry: IMenuEntry) {
    return () => this.onEntryClick(menuEntry);
  }

  private onEntryClick(menuEntry: IMenuEntry) {
    const { history } = this.props;

    history.push(menuEntry.route);
  }
}

export default withRouter<Props>(MainMenu);
