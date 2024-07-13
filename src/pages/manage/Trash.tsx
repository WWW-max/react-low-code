import React, { useState } from 'react';
import styles from './common.module.scss';
import { Space } from 'antd';
import QuestionTable, { DataSourceProps } from '../../components/QuestionTable/QuestionTable';
import ListSearch from '../../components/ListSearch/ListSearch';

export default function Trash() {
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
        <h1 className={styles.left}>回收站</h1>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <QuestionTable dataSource={questionList} />
      </div>
      <div className={styles.footer}>
        <div>分页</div>
      </div>
    </div>
  );
}
