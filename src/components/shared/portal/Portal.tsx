import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children: React.ReactNode;
}

// TODO: Replace this with useId after upgrading to React 18
let portalId = 0;

export default function Portal({ children }: PortalProps) {
  const [id] = useState(() => portalId++);
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const portal = document.createElement("div");
    document.body.appendChild(portal);
    setPortal(portal);

    return () => {
      document.body.removeChild(portal);
    };
  }, [id]);

  if (!portal) {
    // We never render anything because useLayoutEffect will force a rerender
    return null;
  }

  return createPortal(children, portal);
}
