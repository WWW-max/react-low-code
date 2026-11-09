import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, Divider, Space, Tooltip } from 'antd';
import React from 'react';
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '../../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

export default function EditToolbar() {
  const dispatch = useDispatch();
  const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const length = componentList.length;
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);
  const isFirst = selectedIndex <= 0; // 第一个
  const isLast = selectedIndex + 1 >= length; // 最后一个

  /** 删除组件 */
  const handleDelete = () => {
    dispatch(removeSelectedComponent());
  };

  /** 隐藏组件 */
  const handleHidden = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  };

  /** 锁定组件 */
  const handleLock = () => {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  };

  /** 复制 */
  const copy = () => {
    dispatch(copySelectedComponent());
  };

  /** 粘贴 */
  const paste = () => {
    dispatch(pasteCopiedComponent());
  };

  /** 上移 */
  const moveUp = () => {
    if (isFirst) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
  };

  /** 下移 */
  const moveDown = () => {
    if (isLast) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
  };

  /** 撤销 */
  const undo = () => {
    dispatch(UndoActionCreators.undo());
  };

  /** 重做 */
  const redo = () => {
    dispatch(UndoActionCreators.redo());
  };
  return (
    <Space size={4} align="center">
      <Tooltip title="删除">
        <Button icon={<DeleteOutlined />} onClick={handleDelete} disabled={!selectedId} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button icon={<EyeInvisibleOutlined />} onClick={handleHidden} disabled={!selectedId} />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
          disabled={!selectedId}
        />
      </Tooltip>
      <Divider type="vertical" style={{ margin: '0 4px', borderColor: '#e2e8f0' }} />
      <Tooltip title="复制">
        <Button icon={<CopyOutlined />} onClick={copy} disabled={!selectedId} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button icon={<BlockOutlined />} onClick={paste} disabled={copiedComponent == null} />
      </Tooltip>
      <Divider type="vertical" style={{ margin: '0 4px', borderColor: '#e2e8f0' }} />
      <Tooltip title="上移">
        <Button icon={<UpOutlined />} onClick={moveUp} disabled={isFirst || !selectedId} />
      </Tooltip>
      <Tooltip title="下移">
        <Button icon={<DownOutlined />} onClick={moveDown} disabled={isLast || !selectedId} />
      </Tooltip>
      <Divider type="vertical" style={{ margin: '0 4px', borderColor: '#e2e8f0' }} />
      <Tooltip title="撤销">
        <Button icon={<UndoOutlined />} onClick={undo} />
      </Tooltip>
      <Tooltip title="重做">
        <Button icon={<RedoOutlined />} onClick={redo} />
      </Tooltip>
    </Space>
  );
}
