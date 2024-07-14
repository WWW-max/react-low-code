import React from 'react';
import { Button, Card, Space, Tag } from 'antd';
import styles from './QuestionCard.module.scss';
import {
  BarChartOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

type QuestionCardProps = {
  _id: number;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};
export default function QuestionCard(props: QuestionCardProps) {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props;
  const { pathname } = useLocation();
  const nav = useNavigate();
  return (
    <Card
      title={
        <span>
          {pathname.startsWith('/manage/star') ? <StarOutlined style={{ color: 'red' }} /> : null}
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
              {isStar ? (
                <Button icon={<StarOutlined style={{ color: 'red' }} />} type="text">
                  取消收藏
                </Button>
              ) : (
                <Button icon={<StarOutlined />} type="text">
                  收藏
                </Button>
              )}
            </span>
            <Button icon={<CopyOutlined />} type="text">
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
