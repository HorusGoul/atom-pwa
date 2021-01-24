import autobind from "autobind-decorator";
import * as React from "react";
import AppSettings from "../../AppSettings";
import { i18n } from "../../Locale";
import Theme, { THEMES_LIST } from "../../Theme";
import IconButton from "../shared/icon-button/IconButton";
import SelectorModal, {
  ISelectorModalOption,
} from "../shared/selector-modal/SelectorModal";
import "./ThemeSelector.scss";

interface IThemeSelectorState {
  selectorOpen: boolean;
}

@autobind
class ThemeSelector extends React.Component<unknown, IThemeSelectorState> {
  public state: IThemeSelectorState = {
    selectorOpen: false,
  };

  public render() {
    const { selectorOpen } = this.state;

    return (
      <>
        <IconButton
          iconName="format_paint"
          text={i18n("change_theme")}
          onClick={this.openSelector}
        />

        <SelectorModal
          className="theme-selector__modal"
          title={i18n("change_theme")}
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
    return THEMES_LIST.map((theme) => ({
      key: theme,
      text: i18n("theme-" + theme),
    }));
  }

  private closeSelector() {
    this.setState({
      selectorOpen: false,
    });
  }

  private openSelector() {
    this.setState({
      selectorOpen: true,
    });
  }

  private onOptionSelected(option: ISelectorModalOption) {
    const theme = option.key;

    AppSettings.settings.theme = theme;
    AppSettings.save();
    Theme.setTheme(theme);

    this.closeSelector();
  }
}

export default ThemeSelector;
