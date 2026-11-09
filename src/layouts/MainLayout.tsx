import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { Layout, Spin } from 'antd';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';
import Logo from '../components/Logo/Logo';
import UserInfo from '../components/UserInfo/UserInfo';

const { Header, Content, Footer } = Layout;
export default function MainLayout() {
  /** 加载用户信息 */
  const { waitingUserData } = useLoadUserData();
  /** 用户没有登录时，跳转到登录页 */
  useNavPage(waitingUserData);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.left}>
            <Logo />
          </div>
          <div className={styles.right}>
            <UserInfo />
          </div>
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {waitingUserData ? (
            <div className={styles.loadingWrapper}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      <Footer className={styles.footer}>
        问卷低代码平台 &copy;{new Date().getFullYear()} - present. Created by wzp
      </Footer>
    </Layout>
  );
}
