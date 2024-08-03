import React, { FC, useState } from 'react';
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo';
import { useDispatch } from 'react-redux';
import SortableContainer from '../../../../components/DragSortable/SortableContainer';
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked,
} from '../../../../store/componentsReducer';
import styles from './Layers.module.scss';
import SortableItem from '../../../../components/DragSortable/SortableItem';
import classNames from 'classnames';
import { Button, Input, message, Space } from 'antd';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  /** 记录当前正在被修改标题的组件 */
  const [changingTitleId, setChangingTitleId] = useState('');

  /** 图层中点击选中组件, 双击修改组件title */
  const handleTitleClick = (fe_id: string) => {
    const curComponent = componentList.find(c => c.fe_id === fe_id);
    if (curComponent?.isHidden) {
      message.info('不能选中隐藏的组件');
      return;
    }
    if (fe_id !== selectedId) {
      // 当前在图层中点击的组件没有被选中，执行选中
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId('');
      return;
    }

    // 已经点击过的组件，再次点击则记录正在修改标题的组件id
    setChangingTitleId(fe_id);
  };

  /** 修改组件标题 */
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }));
  };

  /** SortableContainer 组件的 items 属性，需要每个 item 都有 id */
  const componentListWithId = componentList.map(c => ({ ...c, id: c.fe_id }));

  /** 拖拽排序结束 */
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }));
  };

  /** 切换 组件隐藏/显示 */
  const changeHidden = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentHidden({ fe_id, isHidden }));
  };
  /** 切换 组件锁定/解锁 */
  const changeLocked = (fe_id: string) => {
    dispatch(toggleComponentLocked({ fe_id }));
  };
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c;

        /** 拼接 title className */
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                {fe_id === changingTitleId && (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                  />
                )}
                {fe_id !== changingTitleId && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={isHidden ? '' : styles.btn}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={isLocked ? '' : styles.btn}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => changeLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;
