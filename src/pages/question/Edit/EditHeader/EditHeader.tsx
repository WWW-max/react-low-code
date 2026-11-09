import React, { ChangeEvent, FC, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Divider, Input, message, Space, Typography } from 'antd';
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import useGetPageInfo from '../../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { changePageTile } from '../../../../store/pageInfoReducer';
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo';
import { useKeyPress, useRequest } from 'ahooks';
import { updateQuestionService } from '../../../../services/question';
import EditToolbar from '../EditToolbar/EditToolbar';

const { Title } = Typography;

/** 显示和修改标题 */
const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();

  const [editState, setEditState] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTile(newTitle));
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        style={{ width: 220 }}
        autoFocus
      />
    );
  }
  return (
    <Space size={4} align="center">
      <Title className={styles.titleText}>{title}</Title>
      <Button icon={<EditOutlined />} type="text" size="small" onClick={() => setEditState(true)} />
    </Space>
  );
};

/** 保存按钮 */
const SaveButton: FC = () => {
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  /** 保存 */
  const { run: save, loading } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
      onSuccess() {
        message.success('保存成功');
      },
    }
  );

  /** 快捷键保存 */
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });

  return (
    <Button onClick={save} loading={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  );
};

/** 发布按钮 */
const PublishButton: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true }); // isPublished: true 代表问卷已经发布
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功！');
        nav('/question/stat/' + id); // 发布成功，跳转到统计页面
      },
    }
  );

  return (
    <Button type="primary" onClick={publish} disabled={loading}>
      发布问卷
    </Button>
  );
};

/** 编辑器头部 */
const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space size={8} align="center">
            <Button type="text" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Divider type="vertical" style={{ margin: '0 4px', borderColor: '#e2e8f0' }} />
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space size={8}>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
