import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './common.module.scss';
import { SnippetsFilled } from '@ant-design/icons';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;
export default function MainLayout() {
  const nav = useNavigate();
  const goLogin = () => {
    nav('/login');
  };
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
