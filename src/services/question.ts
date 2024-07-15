/** 问卷相关接口 */
import axios from './ajax';
import type { ResDataType } from './ajax';
/** 创建问卷 */
export async function createQuestionServices(): Promise<ResDataType> {
  const url = '/api/question';
  const data = await axios.post(url);
  return data;
}
