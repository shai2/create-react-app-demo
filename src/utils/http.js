import axios from "axios";
import { Toast, Modal } from "antd-mobile";
import storage from './storage'
import { env } from './config'

const session = storage.session

// 不走全局loading的url白名单
const notShowLoadingUrls = [
]

class Http {
  /**
   * [constructor 初始化请求参数]
   * @param  {[Number]} timeoutMs  [超时时间，单位毫秒 ]
   * @param {[String]} baseURL [请求的根地址]
   */
  constructor(timeoutMs, baseURL) {
    this.timeoutMs = timeoutMs;
    this.baseURL = baseURL;
  }
  
  /**
   * [get get请求]
   * @param  {[String]} url    [请求资源地址]
   * @param  {[Object]} params [请求参数]
   * @param  {[Boolean]} loadToast [是否显示加载 toast]
   * @param  {[Boolean]} failToast [是否显示失败 toast]
   * @return {[Object]}        [返回的对象，页面接受的函数需要声明async]
   */
  async get(url, params, loadToast, failToast) {
    const config = {
      url: url,
      method: "get",
      baseURL: this.baseURL || "/",
      headers: {
        'Common-Params': `browser=${window.navigator.userAgent}`
      },
      params: params
    };


    if (session.get('sp_token')) {
      config.headers['X-AUTH-TOKEN'] = session.get('sp_token')
    }

    const response = await this.handleError(
      this.timeoutMs,
      axios.request(config),
      url,
      loadToast,
      failToast
    );
    return response;
	}
	
  /**
   * [post post请求]
   * @param  {[String]} url  [请求资源地址]
   * @param  {[Object]} data [请求参数]
   * @param  {[Boolean]} loadToast [是否显示加载 toast]
   * @param  {[Boolean]} failToast [是否显示失败 toast]
   * @return {[type]}      [返回的对象，页面接受的函数需要声明async]
   */
  async post(url, data, loadToast, failToast) {
    const config = {
      url: url,
      method: "post",
      baseURL: this.baseURL || "/",
      headers: {
        'Common-Params': `browser=${window.navigator.userAgent}`,
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: {
        ...data
      }
    };

    if (session.get('sp_token')) {
      config.headers['X-AUTH-TOKEN'] = session.get('sp_token')
    }
    
    const response = await this.handleError(
      this.timeoutMs,
      axios.request(config),
      url,
      loadToast,
      failToast
    );
    return response;
  }

  /**
   * [put put请求]
   * @param  {[String]} url  [请求资源地址]
   * @param  {[Object]} data [请求参数]
   * @param  {[Boolean]} loadToast [是否显示加载 toast]
   * @param  {[Boolean]} failToast [是否显示失败 toast]
   * @return {[type]}      [返回的对象，页面接受的函数需要声明async]
   */
  async put(url, data, loadToast, failToast) {
    const config = {
      url: url,
      method: "put",
      baseURL: this.baseURL || "/",
      headers: {
        'Common-Params': `browser=${window.navigator.userAgent}`,
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: {
        ...data
      }
    };

    if (session.get('sp_token')) {
      config.headers['X-AUTH-TOKEN'] = session.get('sp_token')
    }

    const response = await this.handleError(
      this.timeoutMs,
      axios.request(config),
      url,
      loadToast,
      failToast
    );
    return response;
  }
  
  // 异常处理
  handleError = (timeoutMs, promise, url, loadToast, failToast) => {
    const LoadToast = loadToast !== false || false;
    const FailToast = failToast !== false || false;

    return new Promise((resolve, reject) => {

      if (LoadToast && !notShowLoadingUrls.includes(url)) {
        Toast.loading("加载中...", 0);
      }
      // 超时
      const timeoutID = setTimeout(() => {
        if (FailToast) {
          Toast.fail("网络开小差了ε=(´ο｀*)))", 1);
        }
        reject({
          respCode: "408",
          respMsg: "网络开小差了ε=(´ο｀*)))"
        });
      }, timeoutMs);

      promise.then(
        res => {
          clearTimeout(timeoutID);
					Toast.hide();
					// 这里的成功的状态码需要根据实际环境配置
          if (res.data.code === 2000 || res.data.status === 2000) {
            resolve({ ...res.data, ok: true })
          }  else {
            //这里是失败的配置
            if (FailToast) {
              Toast.info(res.data.message || failToast, 1);
            }
            // Toast.fail(res.data.message || failToast, 1);
            // reject(res.data);
          }
        },
        // 网络异常
        err => {
          clearTimeout(timeoutID);
          Toast.hide();
          console.log(err);
          if (FailToast) {
            Toast.fail("网络状况不太好,请稍后再试", 1);
          }
          reject({
            respCode: "409",
            respMsg: "网络状况不太好,请稍后再试"
          });
        }
      );
    });
  };
}

export default new Http(10000, '/')
