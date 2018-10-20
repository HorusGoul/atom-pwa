import * as autobind from "autobind-decorator";
import classNames from "classnames";
import * as React from "react";
import "./Icon.scss";

const iconCache: { [key: string]: string } = {};

export interface IIconProps {
  name: string;
  className?: string;
}

interface IIconState {
  content: string;
}

class Icon extends React.Component<IIconProps, IIconState> {
  public state: IIconState = {
    content: ""
  };

  public componentDidMount() {
    this.setIcon(this.props);
  }

  public render() {
    const { name, className } = this.props;
    const { content } = this.state;

    const iconClass = classNames("icon", className);

    return (
      <svg
        className={iconClass}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  private setIcon(props: Readonly<IIconProps>) {
    const { name } = props;

    this.getPath(name).then(content => this.setState({ content }));
  }

  private async getPath(iconName: string): Promise<string> {
    let iconContent: string = iconCache[iconName];

    if (!iconContent) {
      iconContent = iconCache[iconName] = await this.fetchIconContent(iconName);
    }

    return iconContent;
  }

  private async fetchIconContent(iconName: string): Promise<string> {
    const fetchIconResponse = await fetch(
      require(`../../../images/icons/${iconName}.svg`)
    );

    let iconContent = await fetchIconResponse.text();
    iconContent = iconContent.replace(/<svg.*?>/gm, "");
    iconContent = iconContent.replace(/<\/svg>/gm, "");

    return iconContent;
  }
}

export default Icon;
