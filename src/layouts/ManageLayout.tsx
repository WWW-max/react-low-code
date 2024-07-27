import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import { Button, Divider, Space, message } from 'antd';
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { createQuestionServices } from '../services/question';
import { useRequest } from 'ahooks';

export default function ManageLayout() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  // const [loading, setLoading] = useState(false);
  // const handleCreateClick = async () => {
  //   setLoading(true);
  //   const res = await createQuestionServices();
  //   const { id } = res.data;
  //   if (id) {
  //     nav(`/question/edit/${id}`);
  //     message.success('创建问卷成功!');
  //   }
  //   setLoading(false);
  // };
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
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={run}
            loading={loading}
          >
            创建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            收藏问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
}
