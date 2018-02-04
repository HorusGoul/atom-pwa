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
      route: "/tests"
    },
    {
      icon: "periodic-table",
      name: "Periodic Table",
      route: "/periodic-table"
    },
    {
      icon: "scale-balance",
      name: "Mass Calculator",
      route: "/mass-calculator"
    },
    {
      icon: "info",
      name: "About",
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
