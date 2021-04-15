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
import DownloadApp from "../download-app/DownloadApp";
import RateApp from "../rate-app/RateApp";
import Button from "../shared/button/Button";
import { useConfirm } from "../shared/confirm";
import IconButton from "../shared/icon-button/IconButton";
import Icon from "../shared/icon/Icon";
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
      <div className={styles.header}>
        <div className={styles.content}>
          <div className={styles.topbar}>
            <div className={styles.logo}>
              <Atom aria-label="Atom" weight={24} size={32} color="primary" />
            </div>

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

            <IconButton
              className={styles.topbarButton}
              aria-label="Settings"
              iconName="settings"
              onClick={() => history.push(ABOUT)}
            />
          </div>

          <Button
            className={styles.search}
            onClick={() => history.push({ search: "openSearch=true" })}
          >
            <Icon name="search" aria-hidden={true} />

            <span>{searchInput.placeholder}</span>
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <RateApp />
        <DownloadApp />

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
  const { confirmAction } = useConfirm();
  const { i18n } = useLocale();

  function onClick() {
    if (data.disabled) {
      confirmAction({
        title: i18n("wip_title"),
        message: i18n("wip_message"),
        hideCancel: true,
        hideConfirm: true,
      });
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
