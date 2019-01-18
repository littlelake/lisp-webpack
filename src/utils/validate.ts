class Validate {
  /**
   * @description 检验手机号
   * @param {any} val - {
   * 移动号段：
   * 134 135 136 137 138 139 147 150 151 152 157 158 159 172 178 182 183 184 187 188
   * 联通号段：
   * 130 131 132 145 155 156 171 175 176 185 186
   * 电信号段：
   * 133 149 153 173 177 180 181 189
   * 虚拟运营商:
   * 170
   * }
   */
  public checkPhone = (val) => {
    const reg = /^(13[0-9]|14[579]|15[0-35-9]|17[01235678]|18[0-9])[0-9]{8}$/;
    return !reg.test(val) ? false : true;
  }

  /**
   * @description 检验邮箱
   * @param {any} val - {
   * Email的规则: name@domain
   * name最长64，domain最长253，总长最长256
   * name可以使用任意ASCII字符:
   * 大小写英文字母 a-z,A-Z
   * 数字 0-9
   * 字符 !#$%&'*+-/=?^_`{|}~
   * 字符 .不能是第一个和最后一个，不能连续出现两次
   * 但是有些邮件服务器会拒绝包含有特殊字符的邮件地址
   * domain仅限于26个英文字母、10个数字、连词号-
   * 连词号-不能是第一个字符
   * 顶级域名（com、cn等）长度为2到6个
   * }
   */
  public checkEmail = (val) => {
    const reg = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;
    return !reg.test(val) ? false : true;
  }

  /**
   * @description 检验商户号
   * @param {any} val - {
   * 商户号的规则: 
   * name最长64，domain最长253，总长最长256
   * name可以使用任意ASCII字符:
   * 大小写英文字母 a-z,A-Z
   * 数字 0-9
   * 字符 !#$%&'*+-/=?^_`{|}~
   * 字符 .不能是第一个和最后一个，不能连续出现两次
   * 但是有些邮件服务器会拒绝包含有特殊字符的邮件地址
   * domain仅限于26个英文字母、10个数字、连词号-
   * 连词号-不能是第一个字符
   * 顶级域名（com、cn等）长度为2到6个
   * }
   */

  /**
   * @description 移除字符串左右的空格
   * @param {string} val - 字符串
   */
  public removeAllSpace = (val) => {
    return (val + '').replace(/\s+/g, '');
  }

  /**
   * @description 检验银行卡号
   * @param {number} val - 银行卡 
   */
  public checkBankCard = (val) => {
    const reg = /^\d{16}|\d{19}$/;
    return !reg.test(val) ? false : true;
  }

  /**
   * @description 检验身份证号
   * @param {number} val - 身份证号 
   */
  public checkCode = (val) => {
    const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    const code = val.substring(17);
    if (p.test(val)) {
      let sum = 0;
      for (let i = 0; i < 17; i++) {
        sum += val[i] * factor[i];
      }
      if (parity[sum % 11] === code.toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  /**
   * @description 检验身份证号（简单方式）
   * @param {number} val - 身份证号 
   */
  public checkSimpleCertNo = (val) => {
    const reg = /^[0-9]{17}[0-9|x|X]$/;
    return !reg.test(val) ? false : true;
  }

  /**
   * @description 新增开户电话正则
   * @param {number} val - 电话
   */
  public checkAccountPhone = (val) => {
    const reg = /^\d{3}-\d{8}|\d{4}-\d{7,8}|(^1\d{10}$)$/;
    return !reg.test(val) ? false : true;
  }

  /**
   * @description 新增开户银行卡正则
   * @param {number} val - 银行卡
   */
  public checkAccountBankCard = (val) => {
    const reg = /^[0-9]{16,19}$/;
    return !reg.test(val) ? false : true;
  }

  /**
   * @description 新增开户邮箱正则
   * @param {number} val - 邮箱
   */
  public checkAccountEmail = (val) => {
    const reg = /^(.+)@(.+)$/;
    return !reg.test(val) ? false : true;
  }

  /**
   * @description 新增开户证件号码正则
   * @param {number} val - 证件号码
   */
  public checkAccountCertNo = (val) => {
    const reg = /^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9X]$|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)/ig;
    return !reg.test(val) ? false : true;
  }
}

export default new Validate();