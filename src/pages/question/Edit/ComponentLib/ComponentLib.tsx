/**
 * 组件库
 */
import React, { FC, useCallback } from 'react';
import { componentConfGroup } from '../../../../components/QuestionComponents';
import Title from 'antd/es/typography/Title';
import type { ComponentConfType } from '../../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../../../store/componentsReducer';
import { nanoid } from 'nanoid';
import styles from './ComponentLib.module.scss';

const ComponentLib: FC = () => {
  /** 根据组件配置生成组件 */
  const genComponent = (conf: ComponentConfType) => {
    const { title, type, Component, defaultProps } = conf;
    const dispatch = useDispatch();

    /** useCallback缓存函数 */
    const handleClick = useCallback(() => {
      dispatch(
        addComponent({
          fe_id: nanoid(), // 前端生成的 id
          title,
          type,
          props: defaultProps,
        })
      );
    }, []);
    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <Component />
      </div>
    );
  };
  return (
    <>
      {componentConfGroup?.map((group, index) => {
        const { groupId, groupName, componentsConf } = group;

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{componentsConf.map(conf => genComponent(conf))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
