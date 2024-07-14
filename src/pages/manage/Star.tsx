import { Space } from 'antd';
import React, { useState } from 'react';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import styles from './common.module.scss';
import ListSearch from '../../components/ListSearch/ListSearch';
import { useTitle } from 'ahooks';

export default function Star() {
  useTitle('问卷低代码平台 - 收藏问卷');
  const [questionList, setQuestionList] = useState([
    {
      _id: 1, // MongoDB 使用_id
      title: '问卷1',
      isPublished: true,
      isStar: true,
      answerCount: 10,
      createdAt: '3月10日 13:23',
    },
    {
      _id: 2,
      title: '问卷2',
      isPublished: false,
      isStar: false,
      answerCount: 10,
      createdAt: '3月10日 13:23',
    },
    {
      _id: 3,
      title: '问卷3',
      isPublished: true,
      isStar: true,
      answerCount: 10,
      createdAt: '5月10日 10:23',
    },
    {
      _id: 4,
      title: '问卷4',
      isPublished: false,
      isStar: true,
      answerCount: 10,
      createdAt: '3月10日 13:23',
    },
  ]);
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.left}>收藏问卷</h1>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {questionList.map(item => (
            <QuestionCard key={item._id} {...item} />
          ))}
        </Space>
      </div>
      <div className={styles.footer}>
        <div>分页</div>
      </div>
    </div>
  );
}
