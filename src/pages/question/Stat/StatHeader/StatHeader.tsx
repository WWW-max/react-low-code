import React, { FC, useMemo, useRef } from 'react';
import styles from './StatHeader.module.scss';
import { Button, Input, InputRef, message, Popover, QRCode, Space, Tooltip, Typography } from 'antd';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import useGetPageInfo from '../../../../hooks/useGetPageInfo';

const { Title } = Typography;

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const { title, isPublished } = useGetPageInfo();

  /** 复制链接 */
  const urlInputRef = useRef<InputRef>(null);
  const copy = () => {
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select(); // 选中 input 的内容
    document.execCommand('copy');
    message.success('拷贝成功');
  };

  /** 链接和二维码 */
  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null;

    /** 拼接url，需要参考C端规则 */
    const url = `http://localhost:3000/question/${id}`;

    /** 定义二维码组件 */
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="点击拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }, [id, isPublished]);
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{LinkAndQRCodeElem}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
