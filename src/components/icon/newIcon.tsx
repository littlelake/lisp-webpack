import * as React from 'react';
import classNames from 'classnames';

class NewIcon extends React.Component<any, any> {
  public render(): JSX.Element {
    const { icon, className } = this.props;

    const iconfont = classNames({
      iconfont: true,
      [`icon-${icon}`]: true,
      [`${className}`]: true
    });

    return (
      <i className={iconfont} />
    );
  }
}

export default NewIcon;