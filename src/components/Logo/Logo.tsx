import React, { FC } from 'react';
import { SnippetsFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { HOME_PATHNAME } from '../../router/index';
import styles from './Logo.module.scss';

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to={HOME_PATHNAME} className={styles.link}>
        <span className={styles.iconBox}>
          <SnippetsFilled />
        </span>
        <span className={styles.title}>问卷低代码平台</span>
      </Link>
    </div>
  );
};

export default Logo;
