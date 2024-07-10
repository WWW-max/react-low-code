import { produce } from 'immer';
import React, { useState } from 'react';

export default function List() {
  const [questionList, setQuestionList] = useState([
    {
      _id: 1, // MongoDB 使用_id
      title: '问卷1',
      isPublished: true,
      isStar: true,
      answerCount: 10,
      createAt: '3月10日 13:23',
    },
    {
      _id: 2,
      title: '问卷2',
      isPublished: false,
      isStar: false,
      answerCount: 10,
      createAt: '3月10日 13:23',
    },
    {
      _id: 3,
      title: '问卷3',
      isPublished: true,
      isStar: true,
      answerCount: 10,
      createAt: '5月10日 10:23',
    },
    {
      _id: 4,
      title: '问卷4',
      isPublished: false,
      isStar: true,
      answerCount: 10,
      createAt: '3月10日 13:23',
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
        createAt: '3月10日 13:23',
      },
    ]);
  }
  // function deleteQuestion(_id: number) {
  //   const arr: Array<QuestionListProps> = [];
  //   questionList.forEach(item => {
  //     if (item._id !== _id) arr.push(item);
  //   });
  //   setQuestionList(arr as Array<QuestionListProps>);
  // }
  function deleteQuestion(_id: number) {
    setQuestionList(
      produce(draftState => {
        const index = draftState.findIndex(item => item?._id === _id);
        draftState.splice(index, 1);
      })
    );
  }
  // function editQuestion(_id: number) {
  //   console.log('编辑id', _id);
  // }
  return (
    <div>
      <h1>问卷列表页</h1>
      <div>
        {questionList.map(item => (
          <div key={item._id} className="list-item">
            <strong>{item.title}</strong>
            &nbsp;
            {item.isPublished ? (
              <span style={{ color: 'green' }}>已发布</span>
            ) : (
              <span>未发布</span>
            )}
            &nbsp;
            <button onClick={() => deleteQuestion(item._id)}>删除问卷</button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={add}>添加问卷</button>
      </div>
    </div>
  );
}
