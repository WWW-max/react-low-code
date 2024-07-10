import React from 'react';
import { Typography, Button } from 'antd';
import styles from './Home.module.scss';
const { Title, Paragraph } = Typography;
export default function Home() {
  return (
    <div className={styles.container}>
      <Title>问卷调查 | 在线投票</Title>
      <Paragraph>已累计创建问卷1000份，发布问卷90份，收到答卷980份</Paragraph>
      <div>
        <Button type="primary">开始使用</Button>
      </div>
    </div>
  );
}
