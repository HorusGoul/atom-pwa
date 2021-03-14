import * as React from "react";

import "./Spinner.scss";

interface ISpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: ISpinnerProps) => {
  const svgClassName = className ? `spinner ${className}` : "spinner";

  return (
    <svg
      id="loading"
      aria-busy="true"
      role="progressbar"
      viewBox="0 0 24 24"
      className={svgClassName}
    >
      <circle cx={12} cy={12} r={10} />
    </svg>
  );
};
