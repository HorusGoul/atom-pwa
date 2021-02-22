import * as React from "react";
import cn from "classnames";
import styles from "./Atom.module.scss";

export interface AtomProps {
  size?: number;
  weight?: 8 | 16 | 24 | 32 | 40 | 48;
  color?: "primary" | "white" | "black" | "inherit";
  spinning?: boolean;
  className?: string;
}

const defaultWeight = 16;

function Atom({
  size = 64,
  color = "primary",
  spinning = false,
  weight = defaultWeight,
  className,
}: AtomProps) {
  let variantColor: {
    main: string;
    contrastText: string;
    dark: string;
    light: string;
  };

  switch (color) {
    case "primary":
      variantColor = {
        main: "#00897b",
        dark: "#00796d",
        light: "#00a393",
        contrastText: "#ffffff",
      };
      break;
    case "white":
      variantColor = {
        main: "#fafafa",
        contrastText: "#000",
        dark: "#f5f5f5",
        light: "#ffffff",
      };
      break;
    case "black":
      variantColor = {
        main: "#333",
        contrastText: "#fff",
        light: "#555",
        dark: "#111",
      };
      break;
    case "inherit": {
      variantColor = {
        main: "currentColor",
        contrastText: "currentColor",
        light: "currentColor",
        dark: "currentColor",
      };
      break;
    }
  }

  const strokeWidth = weight;
  const weightOffset = (weight - defaultWeight) / 2;

  return (
    <svg
      className={cn(styles.root, className, {
        [styles.spin]: spinning,
      })}
      viewBox="0 0 614 614"
      width={size}
      height={size}
    >
      <g transform="translate(-129 -129) scale(.85134)" paintOrder="fill">
        <circle
          cx={512}
          cy={512}
          r={32}
          strokeWidth={0}
          fill={variantColor.main}
        />
        <ellipse
          cx={512}
          cy={512}
          rx={112 - weightOffset}
          ry={352 - weightOffset}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
          stroke={variantColor.dark}
        />
        <ellipse
          cx={679.8}
          cy={1318}
          rx={112 - weightOffset}
          ry={352 - weightOffset}
          transform="rotate(60 1294 770)"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
          stroke={variantColor.main}
        />
        <ellipse
          cx={-512}
          cy={-512}
          rx={112 - weightOffset}
          ry={352 - weightOffset}
          transform="rotate(-60 887 -887)"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
          stroke={variantColor.light}
        />
      </g>
    </svg>
  );
}

export default Atom;
