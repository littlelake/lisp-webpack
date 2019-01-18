import axios from 'axios';

class Ajax {

  /**
   * GET请求
   * @param {string} url - url
   * @param {Object} params - 参数 - {}
   * @param {function} success - 访问成功后的callback
   * @param {function} error - 异常后的callback
   */
  public get(url, params = {}, success, error) {
    // request 拦截器，headers增加token
    this.requestInterceptor();

    axios.get(url, {
      params: {
        ...params
      }
    }).then((res) => {
      success(res);
    }).catch((err) => {
      error(err);
    });

    // response增加拦截器，对超时进行处理
    this.responseInterceptor();
  }

  /**
   * POST请求
   * @param {string} url - url
   * @param {Object} params - 参数 - {}
   * @param {function} success - 访问成功后的callback
   * @param {function} error - 异常后的callback
   */
  public post(url, params, success, error) {
    // request 拦截器，headers增加token
    this.requestInterceptor();

    axios.post(url, {
      ...params
    }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Expose-Headers': '*'
        }
      }).then((res) => {
        success(res);
      }).catch((err) => {
        error(err);
      });

    // response增加拦截器，对超时进行处理    
    this.responseInterceptor();
  }

  /**
   * 导出exportPost请求
   * @param {string} url - url
   * @param {Object} params - 参数 - {}
   * @param {function} success - 访问成功后的callback
   * @param {function} error - 异常后的callback
   */
  public exportPost(url, params, success, error) {
    // request 拦截器，headers增加token
    this.requestInterceptor();

    axios.post(url, {
      ...params
    }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }).then((res) => {
        success(res);
      }).catch((err) => {
        error(err);
      });

    // response增加拦截器，对超时进行处理    
    this.responseInterceptor();
  }

  /**
   * 导出exportGet请求
   * @param {string} url - url
   * @param {Object} params - 参数 - {}
   * @param {function} success - 访问成功后的callback
   * @param {function} error - 异常后的callback
   */
  public exportGet(url, params, success, error) {
    // request 拦截器，headers增加token
    this.requestInterceptor();

    axios({
      method: 'get',
      url,
      params: {
        ...params
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer'
    }).then((res) => {
      success(res);
    }).catch((err) => {
      error(err);
    });

    // response增加拦截器，对超时进行处理    
    this.responseInterceptor();
  }

  // request拦截器，增加token
  public requestInterceptor() {
    const myReqInterceptor = axios.interceptors.request.use((config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.token = `${token}`;
      }
      // 移除拦截器
      axios.interceptors.request.eject(myReqInterceptor);

      return config;
    }, (error) => {
      // 移除拦截器
      axios.interceptors.request.eject(myReqInterceptor);

      return Promise.reject(error);
    });
  }

  // response拦截器
  public responseInterceptor() {
    const myResInterceptor = axios.interceptors.response.use(undefined, (error) => {
      // 当出现超时的情况下（就是code值为8888的时候）
      // if (error.response && error.response.code === '0002') {
      //   // 跳转到登录页面
      //   // this.props.history.push('/login');
      //   // 当登录超时时弹出一个登录框供用户输入帐号名密码
      //   MiniLogin.show('login');
      //   return;
      // }
      // 移除拦截器
      axios.interceptors.response.eject(myResInterceptor);

      return Promise.reject(error);
    });
  }
}

export default new Ajax();