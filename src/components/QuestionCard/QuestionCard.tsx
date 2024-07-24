import React, { useState } from 'react';
import { Button, Card, message, Space, Tag } from 'antd';
import styles from './QuestionCard.module.scss';
import {
  BarChartOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
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
            <Button
              icon={<CopyOutlined />}
              type="text"
              onClick={duplicateQuestion}
              loading={duplicateQuestionLoading}
            >
              复制
            </Button>
            <Button icon={<DeleteOutlined />} type="text">
              删除
            </Button>
          </Space>
        </div>
      </div>
    </Card>
  );
}
