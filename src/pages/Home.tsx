import React from 'react';
import { Typography, Button } from 'antd';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
const { Title, Paragraph } = Typography;
export default function Home() {
  // 第三方Hook
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <Title>问卷调查 | 在线投票</Title>
      <Paragraph>已累计创建问卷1000份，发布问卷90份，收到答卷980份</Paragraph>
      <div>
        <Button type="primary" onClick={() => nav('/manage/list')}>
          开始使用
        </Button>
      </div>
    </div>
  );
}
