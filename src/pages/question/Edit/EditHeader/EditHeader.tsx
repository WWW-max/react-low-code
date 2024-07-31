import React, { FC } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Space, Typography } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

/** 显示和修改标题 */
const TitleElem: FC = () => {
  return (
    <Space>
      <Title>title</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => {}} />
    </Space>
  );
};

/** 保存按钮 */
const SaveButton: FC = () => {
  return <Button>保存</Button>;
};

/** 发布按钮 */
const PublishButton: FC = () => {
  return <Button type="primary">发布</Button>;
};

/** 编辑器头部 */
const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>main</div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
