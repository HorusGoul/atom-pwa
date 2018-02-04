import * as autobind from "autobind-decorator";
import * as classNames from "classnames";
import * as React from "react";

interface IIconProps {
  name: string;
  className?: string;
}

interface IIconState {
  content: string;
}

class Icon extends React.Component<IIconProps, IIconState> {
  public state: IIconState = {
    content: null
  };

  public componentDidMount() {
    this.setIcon(this.props);
  }

  public render() {
    const { name, className } = this.props;
    const { content } = this.state;

    if (!content) {
      return null;
    }

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
    let iconContent: string = await import(`../../../images/icons/${iconName}.svg`);
    const fetchIconResponse = await fetch(iconContent);

    iconContent = await fetchIconResponse.text();
    iconContent = iconContent.replace(/<svg.*?>/gm, "");
    iconContent = iconContent.replace(/<\/svg>/gm, "");

    return iconContent;
  }
}

export default Icon;
