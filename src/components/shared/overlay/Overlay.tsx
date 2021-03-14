import * as React from "react";
import "./Overlay.scss";

interface OverlayProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  opacity?: number;
}

// TODO: Check accessibility
function Overlay({ opacity = 1, onClick }: OverlayProps) {
  return (
    <div
      className="overlay"
      onClick={onClick}
      style={{ opacity }}
      data-testid="overlay"
    />
  );
}

export default Overlay;
