import { message } from 'antd';
import axios from 'axios';

export type ResDataType = {
  [key: string]: any;
};
export type ResType = {
  errno: number;
  msg: string;
  data: ResDataType;
};

const instance = axios.create({
  timeout: 10 * 1000,
});

/** 响应拦截器：同一处理错误，errno和msg */
instance.interceptors.response.use(
  response => {
    const resData = (response.data || {}) as ResDataType;
    const { errno, data, msg } = resData;
    if (errno !== 0) {
      // 错误提示
      if (msg) {
        message.error(msg);
      }
      throw new Error(msg);
    }
    return data as any;
  },
  error => {
    message.error(error);
  }
);

export default instance;
