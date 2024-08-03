import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetUserInfo from './useGetUserInfo';
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  MANAGE_INDEX_PATHNAME,
  LOGIN_PATHNAME,
} from '../router/index';

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (waitingUserData) return;

    /** 已经登录了 */
    if (username) {
      // 是登陆或者注册页面则跳转到主页面
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    /** 未登录 */
    if (isNoNeedUserInfo(pathname)) {
      // 不需要用户信息的页面
      return;
    } else {
      // 需要用户信息的页面，则挑战到登录页面
      nav(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname]);
}

export default useNavPage;
