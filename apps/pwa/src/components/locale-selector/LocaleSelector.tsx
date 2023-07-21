import * as React from "react";
import { useLocale, SUPPORTED_LOCALES } from "@/hooks/useLocale";
import IconButton from "@/components/shared/icon-button/IconButton";
import SelectorModal, {
  SelectorModalOption,
} from "@/components/shared/selector-modal/SelectorModal";
import "./LocaleSelector.scss";

function LocaleSelector() {
  const [selectorOpen, setSelectorOpen] = React.useState(false);

  const { i18n, setLang } = useLocale();

  const options = SUPPORTED_LOCALES.map((locale) => ({
    key: locale,
    text: i18n(locale),
  }));

  function openSelector() {
    setSelectorOpen(true);
  }

  function closeSelector() {
    setSelectorOpen(false);
  }

  function onOptionSelected(option: SelectorModalOption) {
    setLang(option.key);
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
