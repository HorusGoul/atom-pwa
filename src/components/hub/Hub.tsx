import { useHubCategoryById } from "@/hooks/useHubCategories";
import { useHubItemById } from "@/hooks/useHubItems";
import { useLocale } from "@/hooks/useLocale";
import { useRecent } from "@/hooks/useRecent";
import { useSearchInput } from "@/hooks/useSearchInput";
import { useTheme } from "@/hooks/useTheme";
import { ABOUT } from "@/routes";
import * as React from "react";
import { useHistory } from "react-router";
import Atom from "../atom";
import IconButton from "../shared/icon-button/IconButton";
import HubItem from "./hub-item";
import HubSection from "./hub-section";
import styles from "./Hub.module.scss";
import { HubSectionData, useHub } from "./useHub";

function Hub() {
  const { i18n } = useLocale();
  const { theme, setTheme } = useTheme();
  const { sections } = useHub();
  const { recent } = useRecent();
  const searchInput = useSearchInput("push");
  const history = useHistory();

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
          <div className={styles.topbar}>
            <IconButton
              className={styles.topbarButton}
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              iconName={
                theme === "light" ? "dark_mode_outlined" : "dark_mode_filled"
              }
              onClick={() =>
                theme === "light" ? setTheme("dark") : setTheme("light")
              }
            />

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

            <IconButton
              className={styles.topbarButton}
              aria-label="Settings"
              iconName="settings"
              onClick={() => history.push(ABOUT)}
            />
          </div>

          <div className={styles.search}>
            <input type="text" {...searchInput} />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.sections}>
          {recent.length > 0 && (
            <HubSection title={i18n("Recent")}>
              {recent.slice(0, 2).map((id) => (
                <HubItemWithData key={id} item={id} showCategory={true} />
              ))}
            </HubSection>
          )}

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
