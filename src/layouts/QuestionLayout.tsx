import React from 'react';
import { Outlet } from 'react-router-dom';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';
import { Spin } from 'antd';

export default function QuestionLayout() {
  /** 加载用户信息 */
  const { waitingUserData } = useLoadUserData();
  /** 用户没有登录时，跳转到登录页 */
  useNavPage(waitingUserData);

  return (
    <div style={{ height: '100vh' }}>
      {waitingUserData ? (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
