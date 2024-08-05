import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import NotFound from '../pages/NotFound';
import ManageLayout from '../layouts/ManageLayout';
import List from '../pages/manage/List';
import Star from '../pages/manage/Star';
import Trash from '../pages/manage/Trash';
import QuestionLayout from '../layouts/QuestionLayout';
// import Edit from '../pages/question/Edit';
// import Stat from '../pages/question/Stat';
/** 路由懒加载，拆分 bundle ，优化首页体积 */
const Edit = React.lazy(() => import('../pages/question/Edit'));
const Stat = React.lazy(() => import('../pages/question/Stat'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*', // 404 路由配置，写在最后(兜底)
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/question',
    element: <QuestionLayout />,
    children: [
      {
        path: '/question/edit/:id',
        element: <Edit />,
      },
      {
        path: '/question/stat/:id',
        element: <Stat />,
      },
    ],
  },
]);

export default router;

// -------------------- 分割线 ---------------------
// 常用的路由常量
export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_INDEX_PATHNAME = '/manage/list';

// 是否是登陆活注册页面
export const isLoginOrRegister = (pathname: string) =>
  [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname);

// 是否是需要用户信息的页面
export const isNoNeedUserInfo = (pathname: string) =>
  [HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname);
