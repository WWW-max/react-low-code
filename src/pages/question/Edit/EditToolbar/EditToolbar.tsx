import { DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { removeSelectedComponent } from '../../../../store/componentsReducer';
import { useDispatch } from 'react-redux';

export default function EditToolbar() {
  const dispatch = useDispatch();

  /** 删除 */
  const handleDelete = () => {
    dispatch(removeSelectedComponent());
  };
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
    </Space>
  );
}
