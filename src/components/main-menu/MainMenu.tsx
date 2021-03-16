import * as React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "../../Locale";
import "./MainMenu.scss";
import MenuEntry from "./menu-entry/MenuEntry";
import RateApp from "../rate-app/RateApp";
import Atom from "@/components/atom";

function MainMenu() {
  const menuEntries = [
    {
      icon: "test-tube",
      name: i18n("nav_test"),
      route: "/tests",
    },
    {
      icon: "periodic-table",
      name: i18n("periodic_table"),
      route: "/periodic-table",
    },
    {
      icon: "scale-balance",
      name: i18n("mass_calculator"),
      route: "/mass-calculator",
    },
    {
      icon: "info",
      name: i18n("nav_about"),
      route: "/about",
    },
  ];

  const history = useHistory();

  return (
    <div className="main-menu">
      <RateApp />

      <div className="main-menu__brand">
        <div className="main-menu__atom-container">
          <Atom weight={24} size={48} />
        </div>

        <div className="main-menu__app-name">{i18n("app_name")}</div>
      </div>

      <div className="main-menu__entries">
        {menuEntries.map((menuEntry, index) => (
          <MenuEntry
            key={index}
            {...menuEntry}
            onClick={() => history.push(menuEntry.route)}
          />
        ))}
      </div>
    </div>
  );
}

export default MainMenu;
