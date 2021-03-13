import * as React from "react";
import Button, { ButtonProps } from "../../shared/button/Button";
import Icon from "../../shared/icon/Icon";

import "./MenuEntry.scss";

export interface IMenuEntry {
  name: string;
  icon: string;
  route: string;
}

type Props = Omit<ButtonProps, "children"> & IMenuEntry;

const MenuEntry: React.StatelessComponent<Props> = (props) => (
  <Button className="menu-entry" {...props}>
    <div className="menu-entry__icon">
      <Icon name={props.icon} />
    </div>

    <div className="menu-entry__name">{props.name}</div>
  </Button>
);

export default MenuEntry;
