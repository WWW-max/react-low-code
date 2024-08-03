import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { SnippetsFilled } from '@ant-design/icons';
import { Layout } from 'antd';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';
// mock.js只能拦截XMLHttpRequest请求，不能拦截fetch；
// 直接导入使用上线前需要删除，不建议这样用
// import '../_mock/index';
// import axios from 'axios';

const { Header, Content, Footer } = Layout;
export default function MainLayout() {
  // /** 加载用户信息 */
  // const { waitingUserData } = useLoadUserData();
  // /** 用户没有登录时，跳转到登录页 */
  // useNavPage(waitingUserData);

  const nav = useNavigate();
  const goLogin = () => {
    nav('/login');
  };
  // useEffect(() => {
  //   axios.get('/api/test').then(res => console.log('axios data', res.data));
  // }, []);
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left} onClick={() => nav('/')}>
          <SnippetsFilled />
          <span style={{ marginLeft: '10px' }}>问卷低代码平台</span>
        </div>
        <div className={styles.right}>
          <span onClick={goLogin}>登录</span>|<Link to="/register">注册</Link>
        </div>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>问卷低代码平台&copy;2023 - preset. Created by wzp</Footer>
    </Layout>
  );
}
