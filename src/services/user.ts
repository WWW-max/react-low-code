import axios from './ajax';
import { ResDataType } from './ajax';

type LoginParamsType = {
  username: string;
  password: string;
};
type RegisterParamsType = {
  username: string;
  password: string;
  nickname: string;
};
/** 获取用户接口 */
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info';
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
/** 用户登录接口 */
export async function loginServices(params: LoginParamsType): Promise<ResDataType> {
  const url = '/api/user/login';
  const data = await axios.post(url, { params });
  return data;
}
/** 用户注册接口 */
export async function registerServices(params: RegisterParamsType): Promise<ResDataType> {
  const url = '/api/user/register';
  const data = await axios.post(url, { params });
  return data;
}
