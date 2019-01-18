import * as React from 'react';
import classNames from 'classnames';

import './content.scss';

class MainContent extends React.Component<any, any> {
  public render(): JSX.Element {
    const { className = '' } = this.props;
    const cls = classNames({
      "main-content": true,
      [`${className}`]: true
    });

    return (
      <div className={cls}>
        {this.props.children}
      </div>
    );
  }
}

export default MainContent;