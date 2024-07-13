import { produce } from 'immer';
import React, { useState } from 'react';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import { Space, Typography } from 'antd';
import styles from './common.module.scss';
import ListSearch from '../../components/ListSearch/ListSearch';

const { Title } = Typography;

export default function List() {
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
  function add() {
    setQuestionList([
      ...questionList,
      {
        _id: questionList.length + 1,
        title: `问卷${questionList.length + 1}`,
        isPublished: questionList.length % 2 === 0 ? true : false,
        isStar: true,
        answerCount: 10,
        createdAt: '3月10日 13:23',
      },
    ]);
  }
  function deleteQuestion(_id: number) {
    setQuestionList(
      produce(draftState => {
        const index = draftState.findIndex(item => item?._id === _id);
        draftState.splice(index, 1);
      })
    );
  }
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
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
        <div>loadMore</div>
      </div>
    </div>
  );
}
