import * as React from 'react';
import './main.scss';
import { RouteWithSubRoutes } from '../location';

class Main extends React.Component<any, any> {

  /** state */
  public state = {
    collapsed: false,
    selectedKeys: [],
    pwdModalVisible: false,
    pwdModalLoading: false,
    openKeys: [],
    /** 系统菜单 */
    systemMenu: []
  };

  /** 自定义触发器 */
  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  public render(): JSX.Element {
    const { routes } = this.props;

    return (
      <div className="pay-arap">
        {routes && routes.map((route: any, index: any) => (
          <RouteWithSubRoutes key={index} {...route} />
        ))}
      </div>
    );
  }
}

export default Main;