import * as React from "react";
import { useLocale } from "@/hooks/useLocale";
import { useTheme, THEMES_LIST } from "@/hooks/useTheme";
import IconButton from "../shared/icon-button/IconButton";
import SelectorModal, {
  SelectorModalOption,
} from "../shared/selector-modal/SelectorModal";
import "./ThemeSelector.scss";

function ThemeSelector() {
  const { i18n } = useLocale();
  const { setTheme } = useTheme();
  const [selectorOpen, setSelectorOpen] = React.useState(false);

  const options = React.useMemo(
    () =>
      THEMES_LIST.map((theme) => ({
        key: theme,
        text: i18n("theme_" + theme),
      })),
    [i18n]
  );

  function closeSelector() {
    setSelectorOpen(false);
  }

  function openSelector() {
    setSelectorOpen(true);
  }

  function onOptionSelected(option: SelectorModalOption) {
    const theme = option.key;
    setTheme(theme);
    closeSelector();
  }
  return (
    <>
      <IconButton
        iconName="format_paint"
        text={i18n("change_theme")}
        onClick={openSelector}
      />

      <SelectorModal
        className="theme-selector__modal"
        title={i18n("change_theme")}
        closeButton={true}
        onOptionSelected={onOptionSelected}
        options={options}
        open={selectorOpen}
        onClose={closeSelector}
      />
    </>
  );
}

export default ThemeSelector;
