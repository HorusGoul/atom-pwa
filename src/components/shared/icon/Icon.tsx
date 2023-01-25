import classNames from "classnames";
import * as React from "react";
import styles from "./Icon.module.scss";
import invariant from "invariant";

const iconMap = import.meta.glob<
  true,
  string,
  {
    ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  }
>("../../../images/icons/*.svg", {
  eager: true,
});

export interface IconProps {
  name: string;
  className?: string;
}

function Icon({ name, className }: IconProps) {
  const path = `../../../images/icons/${name}.svg`;
  const IconComponent = iconMap[path]?.ReactComponent;

  invariant(IconComponent, `The specified icon doesn't exist!`);

  return (
    <IconComponent
      className={classNames(styles.icon, className)}
      width="24"
      height="24"
    />
  );
}

export default Icon;
