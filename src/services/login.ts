import axios from './ajax';
import { ResDataType } from './ajax';

export async function loginServices(): Promise<ResDataType> {
  const url = '/api/user/login';
  const data = await axios.get(url);
  return data;
}
