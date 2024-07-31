import React, { useState } from 'react';
import { Button, Card, message, Modal, Popconfirm, Space, Tag } from 'antd';
// import type { PopconfirmProps } from 'antd';
import styles from './QuestionCard.module.scss';
import {
  BarChartOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { duplicateQuestionService, updateQuestionService } from '../../services/question';

type QuestionCardProps = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};
export default function QuestionCard(props: QuestionCardProps) {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props;
  const nav = useNavigate();
  const { pathname } = useLocation();
  const isStarPage = pathname.startsWith('/manage/star');
  /** 修改  收藏 */
  const [isStarState, setIsStarState] = useState(isStar);
  const { run: changeStar, loading: changeStarLoading } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState); // 更新state
        message.success('已更新');
      },
    }
  );
  /** 复制 */
  const { run: duplicateQuestion, loading: duplicateQuestionLoading } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功');
        nav(`/question/edit/${result.id}`); // 跳转到问卷编辑页
      },
    }
  );
  /** 假删除 */
  const [isDeletedState, setIsDeletedState] = useState(false);
  const { run: deleteQuestion } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isDeleted: true });
      return data;
    },
    {
      manual: true,
      onSuccess() {
        setIsDeletedState(true);
        message.success('删除成功！');
      },
    }
  );
  function del() {
    Modal.confirm({
      title: '确定删除吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
      okText: '确认',
      cancelText: '取消',
    });
  }
  // 已经删除的问卷或者收藏问卷中取消收藏 不再渲染卡片
  if (isDeletedState || (isStarPage && !isStarState)) return null;

  return (
    <Card
      title={
        <span>
          {isStarState && <StarOutlined style={{ color: 'red' }} />}
          <span>{title}</span>
        </span>
      }
      extra={
        <Space>
          <span>{isPublished ? <Tag color="blue">已发布</Tag> : <Tag>未发布</Tag>} </span>
          <span>答卷:{answerCount}</span>
          <span>{createdAt}</span>
        </Space>
      }
    >
      <div className={styles.container}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<BarChartOutlined />}
              type="text"
              disabled={!isPublished}
              onClick={() => nav(`/question/stat/${_id}`)}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <span>
              <Button
                icon={<StarOutlined style={isStarState ? { color: 'red' } : {}} />}
                type="text"
                onClick={changeStar}
                loading={changeStarLoading}
              >
                {isStarState ? '取消收藏' : '收藏'}
              </Button>
            </span>

            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicateQuestion}
            >
              <Button icon={<CopyOutlined />} type="text" loading={duplicateQuestionLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button icon={<DeleteOutlined />} type="text" onClick={del}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </Card>
  );
}
