import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';
import { Button, Result, Spin } from 'antd';
import StatHeader from './StatHeader/StatHeader';
import styles from './index.module.scss';
import ComponentList from './ComponentList/ComponentList';
import PageStat from './PageStat/PageStat';
import CharStat from './CharStat/CharStat';

export default function Stat() {
  const nav = useNavigate();
  const { loading } = useLoadQuestionData();
  const { title, isPublished } = useGetPageInfo();

  /** 状态提升 selectedId type */
  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [selectedComponentType, setSelectedComponentType] = useState('');

  /** 修改页面标题 */
  useTitle(`问卷统计 -  ${title}`);

  /** loading 效果 */
  const LoadingELem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  );
  /** 主要内容 Element */
  const genContentElem = () => {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="该问卷尚未发布！"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      );
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          {/* <CharStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          /> */}
        </div>
      </>
    );
  };
  const { id } = useParams();
  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading ? LoadingELem : <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  );
}
