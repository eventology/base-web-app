import React from 'react';

export interface AnchorProps extends React.HTMLProps<HTMLAnchorElement> {}

export class Anchor extends React.Component<AnchorProps> {
  render() {
    return <a href="#" {...this.props} onClick={this.handleClick} />;
  }

  private handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!this.props.href) {
      event.preventDefault();
    }
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };
}
