import { ButtonBase } from "@material-ui/core";
import * as React from "react";
import styles from "./HubItem.module.scss";

export interface HubItemProps {
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  title?: string;
  category?: string;
  imageUrl?: string;
}

function HubItem({
  colSpan = 1,
  rowSpan = 1,
  title = "Item",
  category,
  imageUrl,
}: HubItemProps) {
  return (
    <ButtonBase
      className={styles.root}
      data-hub-item={true}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className={styles.overlay} />

      {category && (
        <span
          className={styles.category}
          style={{
            alignSelf: colSpan === 2 ? "flex-end" : "flex-start",
            fontSize: colSpan === 2 ? 13 : 12,
            lineHeight: colSpan === 2 ? 1 : 1.5,
          }}
        >
          {category}
        </span>
      )}

      <span
        className={styles.title}
        style={{
          alignSelf: colSpan === 2 ? "flex-end" : "flex-start",
          fontSize: colSpan === 2 ? 16 : 13,
          paddingTop: colSpan === 2 ? 2 : 0,
        }}
      >
        {title}
      </span>
    </ButtonBase>
  );
}

export default HubItem;
