import * as React from "react";
import Button, { IButtonProps } from "../../shared/button/Button";

import "./MenuEntry.scss";

export interface IMenuEntry {
  name: string;
  icon: string;
  route: string;
}

type Props = IButtonProps & IMenuEntry;

const MenuEntry: React.StatelessComponent<Props> = props => (
  <Button className="menu-entry" {...props}>
    <div className="menu-entry__icon">{props.icon}</div>

    <div className="menu-entry__name">{props.name}</div>
  </Button>
);

export default MenuEntry;
