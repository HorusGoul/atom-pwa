import * as React from "react";
import styles from "./HubSection.module.scss";

export interface HubSectionProps {
  title?: string;
  children: React.ReactNode;
}

function HubSection({ title = "Section", children }: HubSectionProps) {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.items}>{children}</div>
    </div>
  );
}

export default HubSection;
