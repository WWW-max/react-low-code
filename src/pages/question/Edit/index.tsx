import React from 'react';
// import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas/EditCanvas';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import EditHeader from './EditHeader/EditHeader';
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import { changeSelectedId } from '../../../store/componentsReducer';
import { useDispatch } from 'react-redux';

export default function Edit() {
  const dispatch = useDispatch();

  /** 获取单个问卷信息 */
  const { loading } = useLoadQuestionData();

  function clearSelectedId() {
    dispatch(changeSelectedId(''));
  }
  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
