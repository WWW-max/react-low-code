import { Empty, Space, Spin, Typography } from 'antd';
import React from 'react';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import styles from './common.module.scss';
import ListSearch from '../../components/ListSearch/ListSearch';
import { useTitle } from 'ahooks';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage/ListPage';

const { Title } = Typography;

export default function Star() {
  useTitle('问卷低代码平台 - 收藏问卷');
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>收藏问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无收藏问卷" />}
        {!loading && list.length > 0 && (
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            {list.map((item: any) => (
              <QuestionCard key={item?._id} {...item} />
            ))}
          </Space>
        )}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </div>
  );
}
