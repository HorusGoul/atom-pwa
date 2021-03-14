import * as React from "react";
import AppSettings from "../../AppSettings";
import { i18n } from "../../Locale";
import Theme, { THEMES_LIST } from "../../Theme";
import IconButton from "../shared/icon-button/IconButton";
import SelectorModal, {
  SelectorModalOption,
} from "../shared/selector-modal/SelectorModal";
import "./ThemeSelector.scss";

const options = THEMES_LIST.map((theme) => ({
  key: theme,
  text: i18n("theme_" + theme),
}));

function ThemeSelector() {
  const [selectorOpen, setSelectorOpen] = React.useState(false);

  function closeSelector() {
    setSelectorOpen(false);
  }

  function openSelector() {
    setSelectorOpen(true);
  }

  function onOptionSelected(option: SelectorModalOption) {
    const theme = option.key;

    AppSettings.settings.theme = theme;
    AppSettings.save();
    Theme.setTheme(theme);

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
