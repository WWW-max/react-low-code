import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

export default function Edit() {
  /** 获取单个问卷信息 */
  const { loading } = useLoadQuestionData();

  const { id } = useParams();
  return <div className={styles.container}>
    <div >header</div>
    <div className={styles['content-wrapper']}>
      <div className={styles.content}>
        <div className={styles.left}>left</div>
        <div className={styles.main}>
           <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
        </div>
        <div className={styles.right}>right</div>
      </div>
    </div>
  </div>;
}
