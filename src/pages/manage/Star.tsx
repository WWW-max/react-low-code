import { Space, Spin } from 'antd';
import React from 'react';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import styles from './common.module.scss';
import ListSearch from '../../components/ListSearch/ListSearch';
import { useTitle } from 'ahooks';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage/ListPage';

export default function Star() {
  useTitle('问卷低代码平台 - 收藏问卷');
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.left}>收藏问卷</h1>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div>
            <Spin />
          </div>
        )}
        {!loading && (
          <Space direction="vertical" style={{ width: '100%' }}>
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
