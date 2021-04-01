import { useHubCategoryById } from "@/hooks/useHubCategories";
import { useHubItemById } from "@/hooks/useHubItems";
import { useTheme } from "@/hooks/useTheme";
import * as React from "react";
import { useHistory } from "react-router";
import Atom from "../atom";
import HubItem from "./hub-item";
import HubSection from "./hub-section";
import styles from "./Hub.module.scss";
import { HubSectionData, useHub } from "./useHub";

function Hub() {
  const { theme } = useTheme();
  const { sections } = useHub();

  return (
    <div className={styles.hub}>
      <div
        className={styles.header}
        style={{
          background:
            theme === "light"
              ? "linear-gradient(-130deg, #00897b 0%, #01665c 100%)"
              : "",
        }}
      >
        <div className={styles.content}>
          <div
            className={styles.logo}
            style={{
              backgroundColor: theme === "light" ? "#fff" : "var(--primary)",
            }}
          >
            <Atom
              aria-label="Atom"
              weight={24}
              size={48}
              color={theme === "light" ? "primary" : "white"}
            />
          </div>

          <div className={styles.search}>
            <input type="text" placeholder="Search..." aria-label="Search" />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.sections}>
          <HubSection title="Recent">
            <HubItem
              category="Tool"
              title="Periodic Table"
              imageUrl="http://placeimg.com/200/300/periodic-table"
            />
            <HubItem
              category="Quiz"
              title="Valency Test"
              imageUrl="http://placeimg.com/200/300/valency-test"
            />
          </HubSection>

          {sections.map((section) => (
            <HubSectionWithData key={section.title} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hub;

function HubSectionWithData({ title, items }: HubSectionData) {
  return (
    <HubSection title={title}>
      {items.map((item) => (
        <HubItemWithData key={item.item} {...item} />
      ))}
    </HubSection>
  );
}

type HubItemWithDataProps = HubSectionData["items"][number] & {
  showCategory?: boolean;
};

function HubItemWithData({
  item,
  colSpan,
  rowSpan,
  showCategory = false,
}: HubItemWithDataProps) {
  const data = useHubItemById(item);
  const category = useHubCategoryById(data.category);
  const history = useHistory();

  function onClick() {
    if (data.disabled) {
      return;
    }

    if (data.href.startsWith("http")) {
      window.open(data.href);
      return;
    }

    history.push(data.href);
  }

  return (
    <HubItem
      title={data.title}
      disabled={data.disabled}
      imageUrl={data.imageUrl}
      category={showCategory ? category.title : undefined}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={onClick}
    />
  );
}
