import * as React from "react";

import "./Spinner.scss";

interface ISpinnerProps {
  className?: string;
}

export const Spinner: React.StatelessComponent<ISpinnerProps> = ({
  className
}) => {
  const svgClassName = className ? `spinner ${className}` : "spinner";

  return (
    <svg viewBox="0 0 24 24" className={svgClassName}>
      <circle cx={12} cy={12} r={10} />
    </svg>
  );
};
