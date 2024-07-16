/** 问卷相关接口 */
import axios from './ajax';
import type { ResDataType } from './ajax';

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};
/** 创建问卷 */
export async function createQuestionServices(): Promise<ResDataType> {
  const url = '/api/question';
  const data = await axios.post(url);
  return data;
}
/** 获取问卷列表 */
export async function getQuestionServices(opt: Partial<SearchOption> = {}): Promise<ResDataType> {
  const url = '/api/question';
  const data = await axios.get(url, { params: opt });
  return data;
}
