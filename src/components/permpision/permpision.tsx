import * as React from 'react';
/** 获取当前权限列表 */
let permpisionList: any = [];

function getPermpisionList(data: any) {
  permpisionList = !data ? [] : data;
}

/** 判断当前权限是否在 */
function checkPrivilege(permpisionName: any) {
  if (permpisionList.includes(permpisionName)) {
    return true;
  }
  return false;
}

/** 权限按钮显示/隐藏 */
const Permpision = (PermpisionComponent: any) => {

  return class extends React.Component<any, any> {
    public render(): JSX.Element {
      const { auth, ...props } = this.props;

      if (!permpisionList.length) {
        return <PermpisionComponent {...props} />;
      } else {
        if (!checkPrivilege(auth)) {
          return (<span>{null}</span>);
        } else {
          return <PermpisionComponent {...props} />;
        }
      }
    }
  };
};

export {
  getPermpisionList,
  Permpision,
  permpisionList,
  checkPrivilege
};