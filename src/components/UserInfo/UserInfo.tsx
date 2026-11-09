import React, { FC } from 'react';
import { Button, Divider, message, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { LOGIN_PATHNAME } from '../../router';
import { removeUserToken } from '../../utils/user-token';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import { logoutReducer } from '../../store/userReducer/userReducer';

const UserInfo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { username, nickname } = useGetUserInfo(); // 从 redux 中获取用户信息

  function logout() {
    dispatch(logoutReducer()); // 清空了 redux user 数据
    removeUserToken(); // 清除 token 的存储
    message.success('退出成功');
    nav(LOGIN_PATHNAME);
  }

  const UserInfoElem = (
    <Space size={8} align="center">
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#334155',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        <UserOutlined style={{ color: '#64748b' }} />
        <span>{nickname || username}</span>
      </span>
      <Divider type="vertical" style={{ margin: '0 4px', borderColor: '#e2e8f0' }} />
      <Button
        type="text"
        size="small"
        icon={<LogoutOutlined />}
        onClick={logout}
        style={{ color: '#64748b' }}
      >
        退出
      </Button>
    </Space>
  );

  const LoginElem = (
    <Link to={LOGIN_PATHNAME}>
      <Button type="default" size="middle">
        登录
      </Button>
    </Link>
  );

  return <div>{username ? UserInfoElem : LoginElem}</div>;
};

export default UserInfo;
