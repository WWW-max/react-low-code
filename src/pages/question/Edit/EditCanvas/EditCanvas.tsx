import React, { FC, MouseEvent } from 'react';
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo';
import {
  changeSelectedId,
  ComponentInfoType,
  moveComponent,
} from '../../../../store/componentsReducer';
import { getComponentConfByType } from '../../../../components/QuestionComponents';
import classNames from 'classnames';
import styles from './EditCanvas.module.scss';
import { useDispatch } from 'react-redux';
import SortableContainer from '../../../../components/DragSortable/SortableContainer';
import SortableItem from '../../../../components/DragSortable/SortableItem';

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
  /** SortableContainer 组件的 items 属性，需要每个 item 都有 id */
  const componentListWithId = componentList.map(cinfo => ({ ...cinfo, id: cinfo.fe_id }));

  /** 拖拽排序结束后 */
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }));
  };
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(cinfo => {
            const { fe_id, isLocked } = cinfo;
            /** 拼接class name */
            const wrapperDefaultClassName = styles['component-wrapper'];
            const selectedClassName = styles.selected;
            const lockedClassName = styles.locked;
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            });
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(cinfo)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
