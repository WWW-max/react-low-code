import React, { useState } from 'react';
import { Button, message, Modal, Popconfirm, Space, Tag } from 'antd';
import styles from './QuestionCard.module.scss';
import {
  BarChartOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
      title: '确定删除该问卷吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后可在回收站中找回',
      onOk: deleteQuestion,
      okText: '确认',
      cancelText: '取消',
    });
  }
  // 已经删除的问卷或者收藏问卷中取消收藏 不再渲染卡片
  if (isDeletedState || (isStarPage && !isStarState)) return null;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.titleArea}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
            className={styles.titleLink}
          >
            {isStarState && <StarFilled className={styles.starIcon} />}
            <span>{title}</span>
          </Link>
        </div>
        <div className={styles.metaArea}>
          {isPublished ? (
            <Tag color="processing" bordered={false}>
              已发布
            </Tag>
          ) : (
            <Tag bordered={false}>未发布</Tag>
          )}
          <span className={styles.metaItem}>答卷 {answerCount}</span>
          <span className={styles.metaTime}>{createdAt}</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.left}>
          <Space size={4}>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<BarChartOutlined />}
              type="text"
              size="small"
              disabled={!isPublished}
              onClick={() => nav(`/question/stat/${_id}`)}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space size={4}>
            <Button
              icon={isStarState ? <StarFilled style={{ color: '#f59e0b' }} /> : <StarOutlined />}
              type="text"
              size="small"
              onClick={changeStar}
              loading={changeStarLoading}
            >
              {isStarState ? '取消收藏' : '收藏'}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicateQuestion}
            >
              <Button
                icon={<CopyOutlined />}
                type="text"
                size="small"
                loading={duplicateQuestionLoading}
              >
                复制
              </Button>
            </Popconfirm>
            <Button icon={<DeleteOutlined />} type="text" size="small" onClick={del}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
