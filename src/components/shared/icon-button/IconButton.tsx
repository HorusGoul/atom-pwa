import * as classNames from "classnames";
import * as React from "react";
import Button from "../button/Button";
import Icon from "../icon/Icon";

interface IIconButtonProps {
  iconName: string;
  onClick?: () => void;
  className?: string;
}

class IconButton extends React.Component<IIconButtonProps, {}> {
  public render() {
    const { iconName, className, onClick } = this.props;

    const buttonClass = classNames("icon-button", className);

    return (
      <Button className={buttonClass} onClick={onClick}>
        <Icon name={iconName} />
      </Button>
    );
  }
}

export default IconButton;
