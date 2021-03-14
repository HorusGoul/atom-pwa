import * as React from "react";
import AppSettings from "../../AppSettings";
import Locale, { i18n, SUPPORTED_LOCALES } from "../../Locale";
import IconButton from "../shared/icon-button/IconButton";
import SelectorModal, {
  SelectorModalOption,
} from "../shared/selector-modal/SelectorModal";
import "./LocaleSelector.scss";

const options = SUPPORTED_LOCALES.map((locale) => ({
  key: locale,
  text: i18n(locale),
}));

function LocaleSelector() {
  const [selectorOpen, setSelectorOpen] = React.useState(false);

  function openSelector() {
    setSelectorOpen(true);
  }

  function closeSelector() {
    setSelectorOpen(false);
  }

  function onOptionSelected(option: SelectorModalOption) {
    const lang = option.key;

    AppSettings.settings.locale = lang;
    AppSettings.save();
    Locale.setLocale(lang);

    closeSelector();
  }

  return (
    <>
      <IconButton
        className="locale-selector__button"
        iconName="translate"
        text={i18n("change_language")}
        onClick={openSelector}
      />

      <SelectorModal
        className="locale-selector__modal"
        title={i18n("change_language")}
        closeButton={true}
        onOptionSelected={onOptionSelected}
        options={options}
        open={selectorOpen}
        onClose={closeSelector}
      />
    </>
  );
}

export default LocaleSelector;
