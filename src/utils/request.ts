import axios from 'axios';
import proxy from '../configs/host';
import { MessagePlugin, NotificationPlugin } from 'tdesign-react';

// 开发接口
const env = import.meta.env.MODE || 'development';
const API_HOST = proxy[env].API;

const SUCCESS_CODE = 0;
const TIMEOUT = 5000;
export const TOKEN_NAME = 'authorization';

const codeMessage: any = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户未得到授权，但是访问是被禁止的',
  404: '访问的资源不存在',
  405: '请求方法不被允许',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};

export const instance = axios.create({
  baseURL: API_HOST,
  timeout: TIMEOUT,
  withCredentials: true,
});

// 请求拦截
instance.interceptors.request.use((request: any) => {
  // 获取 token, 存储到每次请求的请求头中
  request.headers = { Authorization: `Bearer ${localStorage.getItem(TOKEN_NAME) || ''}` };
  return request;
});

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      // 如果状态码为200，则返回数据 data
      const { data } = response;
      return data;
    }
    // 抛出异常
    return Promise.reject(response);
  }, // 接收异常
  (e) => {
    const { status, data } = e.response;
    if (status === 401) {
      MessagePlugin.info('登录已过期，请重新登录');
      window.location.href = '/#/login/index';
      return data;
    }
    const errorText = codeMessage[status] || '未知错误';
    // 右上角错误提示
    NotificationPlugin.error({
      title: `[${status}]${errorText}`,
      // content: JSON.stringify(data.data),
      // footer: errorText,
      duration: 3000,
    });
    return data;
  },
);

export default instance;
