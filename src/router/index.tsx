import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import ManageLayout from '../layouts/ManageLayout';
import List from '../pages/manage/List';
import Star from '../pages/manage/Star';
import Trash from '../pages/manage/Trash';
import QuestionLayout from '../layouts/QuestionLayout';
import Edit from '../pages/question/Edit';

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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '*', // 404 路由配置，写在最后(兜底)
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/manage',
    element: <ManageLayout />,
    children: [
      {
        path: 'list',
        element: <List />,
      },
      {
        path: '/star',
        element: <Star />,
      },
      {
        path: '/trash',
        element: <Trash />,
      },
    ],
  },
  {
    path: '/question',
    element: <QuestionLayout />,
    children: [
      {
        path: '/edit/:id',
        element: <Edit />,
      },
      {
        path: '/stat/:id',
        element: <Edit />,
      },
    ],
  },
]);

export default router;
