import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { MANAGE_INDEX_PATHNAME } from '../router';

export default function Home() {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.tag}>ENTERPRISE SURVEY WORKBENCH</div>
        <h1 className={styles.title}>问卷调查与在线表单系统</h1>
        <p className={styles.subtitle}>
          支持可视化拖拽编排、组件图层管理与实时答卷统计分析，快速完成业务调研与数据收集。
        </p>
        <div className={styles.actions}>
          <div className={styles.btnOrbitWrapper}>
            <button
              type="button"
              className={styles.startBtn}
              onClick={() => nav(MANAGE_INDEX_PATHNAME)}
            >
              <span className={styles.btnText}>开始使用</span>
              <ArrowRightOutlined className={styles.arrowIcon} />
            </button>
          </div>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metricItem}>
            <div className={styles.metricValue}>1,000</div>
            <div className={styles.metricLabel}>累计创建问卷（份）</div>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metricItem}>
            <div className={styles.metricValue}>90</div>
            <div className={styles.metricLabel}>已发布在线问卷（份）</div>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metricItem}>
            <div className={styles.metricValue}>980</div>
            <div className={styles.metricLabel}>累计回收答卷（份）</div>
          </div>
        </div>
      </div>
    </div>
  );
}
