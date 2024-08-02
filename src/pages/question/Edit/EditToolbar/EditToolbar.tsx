import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import {
  changeComponentHidden,
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '../../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo';

export default function EditToolbar() {
  const dispatch = useDispatch();
  const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};

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
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={copy}
          disabled={!selectedId}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
    </Space>
  );
}
