import { Button, Space, Table, Modal } from 'antd';
import React, { FC, useState } from 'react';
import { trashColumns } from '../../constant';
import type { DataType } from '../../constant';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export type DataSourceProps = {
  dataSource: Array<DataType>;
};

const { confirm } = Modal;
const QuestionTable: FC<DataSourceProps> = (props: DataSourceProps) => {
  /** 被选中的id */
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  /** 表格数据 */
  const { dataSource } = props;
  // 每行需要唯一的key，用于勾选
  const data = dataSource.map(item => ({ ...item, key: item._id }));

  /** 配置项 */
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedIds(selectedRowKeys as string[]);
    },
  };
  /** 彻底删除 */
  const forceDelete = () => {
    console.log('forceDelete', selectedIds);
  };
  const del = () => {
    confirm({
      title: '确定彻底删除问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后，无法恢复',
      onOk: forceDelete,
      okText: '确认',
      cancelText: '取消',
    });
  };
  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds?.length === 0}>
            恢复
          </Button>
          <Button type="primary" danger disabled={selectedIds?.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <div style={{ border: '1px solid #e8e8e8' }}>
        <Table columns={trashColumns} dataSource={data} rowSelection={rowSelection} />
      </div>
    </>
  );
};

export default QuestionTable;
