import wx from 'weixin-js-sdk';
import Ajax from './ajax';

import { formatUrlParams } from './common';

// 获取access_token
const getAccessToken = () => {
  const accessToken = '';
  const expiresIn = 0;
  Ajax.get(
    'https://api.weixin.qq.com/cgi-bin/token',
    {
      grant_type: 'client_credential',
      appid: 'wx9e4481b6d46ae9c1',
      secret: '224d1f6b82bb3037c6d262541ae113e4'
    },
    (res: any) => {
      console.log(res);
    },
    (err: any) => {
      console.log(err);
    }
  );

  return {
    accessToken,
    expiresIn
  };
};

// 获取jsapi_ticket
const getJsApiTicket = (accessToken: any) => {
  const data = {};
  Ajax.get(
    'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    {
      access_token: accessToken,
      type: 'jsapi'
    },
    (res: any) => {
      console.log(res);
    },
    (err: any) => {
      console.log(err);
    }
  );
  return data;
};

export {
  getAccessToken,
  getJsApiTicket
};