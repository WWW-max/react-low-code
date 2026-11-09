import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import { Button, message } from 'antd';
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { createQuestionServices } from '../services/question';
import { useRequest } from 'ahooks';
import classNames from 'classnames';

export default function ManageLayout() {
  const { pathname } = useLocation();
  const nav = useNavigate();

  const { loading, run } = useRequest(createQuestionServices, {
    manual: true,
    onSuccess: res => {
      nav(`/question/edit/${res?.id}`);
      message.success('创建问卷成功！');
    },
    onError: error => {
      message.error(error.message);
    },
  });

  const navItems = [
    {
      key: '/manage/list',
      label: '我的问卷',
      icon: <BarsOutlined />,
    },
    {
      key: '/manage/star',
      label: '收藏问卷',
      icon: <StarOutlined />,
    },
    {
      key: '/manage/trash',
      label: '回收站',
      icon: <DeleteOutlined />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={run}
          loading={loading}
          block
        >
          创建问卷
        </Button>
        <div className={styles.navMenu}>
          {navItems.map(item => {
            const active = pathname.startsWith(item.key);
            return (
              <button
                key={item.key}
                type="button"
                className={classNames(styles.navItem, { [styles.active]: active })}
                onClick={() => nav(item.key)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
}
