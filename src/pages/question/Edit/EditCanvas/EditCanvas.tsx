import React, { FC, MouseEvent } from 'react';
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo';
import { changeSelectedId, ComponentInfoType } from '../../../../store/componentsReducer';
import { getComponentConfByType } from '../../../../components/QuestionComponents';
import classNames from 'classnames';
import styles from './EditCanvas.module.scss';
import { useDispatch } from 'react-redux';

type PropsType = {
  loading: boolean;
};

const genComponent = (componentInfo: ComponentInfoType) => {
  const { type, props } = componentInfo; // 从redux store中获取的（服务器中获取）每个组件的信息

  const componentConf = getComponentConfByType(type); // 根据组件类型获取组件配置信息
  if (componentConf == null) return null;

  const { Component } = componentConf;
  return <Component {...props} />;
};

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  /** 点击选中 */
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation(); // 阻止冒泡
    dispatch(changeSelectedId(id));
  }
  return (
    <div className={styles.canvas}>
      {componentList.map(cinfo => {
        const { fe_id } = cinfo;
        /** 拼接class name */
        const wrapperDefaultClassName = styles['component-wrapper'];
        const selectedClassName = styles.selected;
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });
        return (
          <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
            <div className={styles.component}>{genComponent(cinfo)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;
