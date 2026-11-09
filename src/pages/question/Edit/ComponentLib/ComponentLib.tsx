/**
 * 组件库
 */
import React, { FC } from 'react';
import { componentConfGroup } from '../../../../components/QuestionComponents';
import type { ComponentConfType } from '../../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../../../store/componentsReducer';
import { nanoid } from 'nanoid';
import styles from './ComponentLib.module.scss';

const ComponentLib: FC = () => {
  const dispatch = useDispatch();

  /** 根据组件配置生成组件 */
  const genComponent = (conf: ComponentConfType) => {
    const { title, type, Component, defaultProps } = conf;

    const handleClick = () => {
      dispatch(
        addComponent({
          fe_id: nanoid(), // 前端生成的 id
          title,
          type,
          props: defaultProps,
        })
      );
    };
    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    );
  };
  return (
    <div className={styles.libContainer}>
      {componentConfGroup?.map((group, index) => {
        const { groupId, groupName, componentsConf } = group;

        return (
          <div key={groupId} className={styles.group}>
            <div className={styles.groupTitle} style={{ marginTop: index > 0 ? '20px' : '4px' }}>
              {groupName}
            </div>
            <div>{componentsConf.map(conf => genComponent(conf))}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentLib;
