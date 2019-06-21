/* eslint-disable */
// 1.引入axios
import axios from 'axios';
import getBaseUrl from './mock.config.js';
import router from '../router';
let url = require('url');
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let CancelToken = axios.CancelToken;

let removePending = config => {
  let baseURL = url.parse(config.url).pathname;
  pending.forEach((p, index) => {
    if (p.u === baseURL + '&' + config.method) {
      p.f();
      pending.splice(index, 1);
    }
  });
};

// 2.配置默认值
axios.defaults.baseURL = getBaseUrl();

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;
axios.defaults.timeout = 50000;

// 3.请求拦截
axios.interceptors.request.use(
  config => {
    removePending(config);
    config.cancelToken = new CancelToken(c => {
      let baseURL = url.parse(config.url).pathname;
      pending.push({
        u: baseURL + '&' + config.method,
        f: c
      });
    });
    // 从本地获取token,并在请求头中设置token
    const token = localStorage.getItem('move_token');
    config.headers.common['Authorization'] = token;
    return config;
  },
  error => {
    console.log(err); // for debug
    return Promise.reject(error);
  }
);
// 4.响应拦截
axios.interceptors.response.use(
  response => {
    removePending(response.config);
    return response;
  },
  error => {
    if (error.toString() === 'Cancel')
      return Promise.reject({ message: 'cancel' });
    if (error.toString().includes('timeout'))
      return Promise.reject({ message: '请求超时' });
    if (!error.response) return Promise.reject({ message: '网络异常' });
    switch (error.response.status) {
      case 401:
        if (
          error.response.data.detail ==
          'Authentication credentials were not provided.'
        ) {
          error.message = '您尚未登录,请登录';
          router.push('/login');
        } else if (error.response.data.detail == 'Signature has expired.') {
          error.message = '登录已失效，请重新登录';
          router.push('/login');
        }
        break;
      case 403:
        error.message = '没有此区域权限';
        router.push('/403');
        break;
      case 404:
        error.message = '请求地址错误';
        break;
      default:
        error.message = '网络异常';
        break;
    }
    return Promise.reject(error);
  }
);

// 5.对axios进行二次封装
export default function request(
  url,
  type = 'GET',
  data = {},
  responseType = 'json'
) {
  return new Promise((resolve, reject) => {
    //配置参数对象
    let option = {
      url,
      method: type,
      responseType: responseType,
      validateStatus: function(status) {
        return (
          (status >= 200 && status < 300) || status === 400 || status === 429
        );
      }
    };
    // 对get和post请求传递的数据进行区分
    type.toLowerCase() === 'get'
      ? (option.params = data)
      : (option.data = data);
    // axios核心，发送请求
    axios(option)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch(err => {
        if (err.message === 'cancel') return;
        Message.error(err.message);
      });
  });
}
