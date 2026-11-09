import React, { FC, useMemo, useRef } from 'react';
import styles from './StatHeader.module.scss';
import {
  Button,
  Divider,
  Input,
  InputRef,
  message,
  Popover,
  QRCode,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { CopyOutlined, ExportOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
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

  /** 链接和二维码 (使用 useMemo 1. 依赖项是否经常变化; 2. 缓存的元素是否创建成本较高)*/
  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null;

    /** 拼接url，需要参考C端规则 */
    const url = `http://${window.location.hostname}:3000/question/${id}`;

    /** 定义二维码组件 */
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space size={6}>
        <Input value={url} style={{ width: '280px' }} ref={urlInputRef} readOnly />
        <Tooltip title="拷贝答卷链接">
          <Button icon={<CopyOutlined />} onClick={copy} />
        </Tooltip>
        <Tooltip title="点击打开链接">
          <Button
            icon={<ExportOutlined />}
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
          />
        </Tooltip>
        <Popover content={QRCodeElem} placement="bottom">
          <Button icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    );
  }, [id, isPublished]);
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space size={8} align="center">
            <Button type="text" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Divider type="vertical" style={{ margin: '0 4px', borderColor: '#e2e8f0' }} />
            <Title className={styles.titleText}>{title}</Title>
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
