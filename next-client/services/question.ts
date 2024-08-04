import { get } from './ajax';

/** 根据问卷id获取问卷组件列表信息 */
export async function getQuestionById(id: string) {
  const url = `/api/question/${id}`; // Mock 或服务端
  const data = await get(url);
  return data;
}
