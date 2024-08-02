import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import {
  changeComponentHidden,
  removeSelectedComponent,
  toggleComponentLocked,
} from '../../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo';

export default function EditToolbar() {
  const dispatch = useDispatch();
  const { selectedId, componentList, selectedComponent } = useGetComponentInfo();
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
    </Space>
  );
}
