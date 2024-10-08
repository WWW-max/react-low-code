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
/** 获取单个问卷信息 */
export async function getSingleQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
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
/** 更新单个问卷 */
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: unknown }
): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
}
/** 复制问卷 */
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}
/** 批量彻底删除问卷 */
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
  const url = '/api/question';
  const data = await axios.delete(url, { params: { ids } });
  return data;
}
