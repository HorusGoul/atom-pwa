import autobind from "autobind-decorator";
import * as React from "react";
import AppSettings from "../../AppSettings";
import Locale, { i18n, SUPPORTED_LOCALES } from "../../Locale";
import IconButton from "../shared/icon-button/IconButton";
import SelectorModal, {
  ISelectorModalOption
} from "../shared/selector-modal/SelectorModal";
import "./LocaleSelector.scss";

interface ILocaleSelectorState {
  selectorOpen: boolean;
}

@autobind
class LocaleSelector extends React.Component<{}, ILocaleSelectorState> {
  public state: ILocaleSelectorState = {
    selectorOpen: false
  };

  public render() {
    const { selectorOpen } = this.state;

    return (
      <>
        <IconButton
          className="locale-selector__button"
          iconName="translate"
          text={i18n("change_language")}
          onClick={this.openSelector}
        />

        <SelectorModal
          className="locale-selector__modal"
          title={i18n("change_language")}
          closeButton={true}
          onOptionSelected={this.onOptionSelected}
          options={this.buildOptions()}
          open={selectorOpen}
          onClose={this.closeSelector}
        />
      </>
    );
  }

  private buildOptions() {
    return SUPPORTED_LOCALES.map(locale => ({
      key: locale,
      text: i18n(locale)
    }));
  }

  private closeSelector() {
    this.setState({
      selectorOpen: false
    });
  }

  private openSelector() {
    this.setState({
      selectorOpen: true
    });
  }

  private onOptionSelected(option: ISelectorModalOption) {
    const lang = option.key;

    AppSettings.settings.locale = lang;
    AppSettings.save();
    Locale.setLocale(lang);

    this.closeSelector();
  }
}

export default LocaleSelector;
