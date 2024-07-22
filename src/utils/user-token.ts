/** 获取、存储、清空 用户token */
const KEY = 'USER_TOKEN';
export function getUserToken() {
  return localStorage.getItem(KEY) || '';
}
export function setUserToken(token: string) {
  localStorage.setItem(KEY, token);
}
export function removeUserToken() {
  localStorage.removeItem(KEY);
}
