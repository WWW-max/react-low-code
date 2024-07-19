import React, { useState } from 'react';
import styles from './common.module.scss';
import { Empty, Space, Spin } from 'antd';
import QuestionTable, { DataSourceProps } from '../../components/QuestionTable/QuestionTable';
import ListSearch from '../../components/ListSearch/ListSearch';
import { useTitle } from 'ahooks';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage/ListPage';

export default function Trash() {
  useTitle('问卷低代码平台 - 回收站');
  const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.left}>回收站</h1>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && list.length === 0 && <Empty description="暂无数据" />}
      {!loading && list.length > 0 && (
        <div className={styles.content}>
          <QuestionTable dataSource={list} />
        </div>
      )}
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </div>
  );
}
