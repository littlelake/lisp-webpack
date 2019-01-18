import moment from 'moment';

/**
 * @description 得到url地址参数，以对象的形式展示
 * @param url - url链接
 */
export function url2json(url: any) {
  const json = {};
  if (!url) {
    return json;
  }
  const newUrl = url.replace('\?', '');
  const arr = newUrl.split('&');
  for (const i of arr) {
    const arr2 = i.split('=');
    json[arr2[0]] = arr2[1];
  }
  return json;
}

/**
 * @description 千分位
 * @param num - 数字
 */
export function formatCurrency(num: any) {
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num)) {
    num = '0';
  }
  const sign = (num === (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents: any = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) {
    cents = '0' + cents;
  }
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  }
  return (((sign) ? '' : '-') + num + '.' + cents);
}

/**
 * @description 输出除了undefined和null的数据
 * @param {any} str - 字符串/数字
 */
export function getNonEmpty(str: any) {
  return (str !== undefined || str !== null || str !== "") ? str : '--';
}

/**
 * @description 获取日期形式
 * @param timestamp - 时间戳
 * @param type - 类型（常见的有'YYYY-MM-DD'/'YYYY-MM-DD hh:mm:ss'），默认为'YYYY-MM-DD hh:mm:ss'
 */
export function getTime(timestamp: any, type?: any) {
  if (!type) {
    return !!timestamp ? moment(timestamp).format('YYYY-MM-DD HH:mm:ss') : '-';
  }
  return !!timestamp ? moment(timestamp).format(type) : '-';
}

// 将对象改为get请求格式
export function formatUrlParams(obj: any) {
  let params = '';
  if (JSON.stringify(obj) === '{}') {
    return params;
  }
  for (const field of Object.keys(obj)) {
    params += `${field}=${obj[field]}&`;
  }
  // 去掉最后的&
  params = params.substr(0, params.length - 1);
  return `?${params}`;
}