import { Button, Space, Table, Modal, message } from 'antd';
import React, { FC, useState } from 'react';
import { trashColumns } from '../../constant';
import type { DataType } from '../../constant';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { deleteQuestionService, updateQuestionService } from '../../services/question';

export type DataSourceProps = {
  dataSource: Array<DataType>;
  refresh: () => void;
};

const { confirm } = Modal;
const QuestionTable: FC<DataSourceProps> = (props: DataSourceProps) => {
  /** 被选中的id */
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  /** 表格数据 */
  const { dataSource, refresh } = props;
  // 每行需要唯一的key，用于勾选
  const data = dataSource.map(item => ({ ...item, key: item._id }));

  /** 配置项 */
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedIds(selectedRowKeys as string[]);
    },
  };
  /** 恢复 */
  const { run: recover, loading: recoverLoading } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: true });
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('恢复成功！');
        refresh(); // 手动刷新列表
        setSelectedIds([]);
      },
    }
  );
  /** 彻底删除 */
  const { run: forceDelete } = useRequest(
    async () => {
      await deleteQuestionService(selectedIds);
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功！');
        refresh();
        setSelectedIds([]);
      },
    }
  );
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
      <div
        style={{
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Space>
          <Button
            type="primary"
            disabled={selectedIds?.length === 0}
            onClick={recover}
            loading={recoverLoading}
          >
            恢复
          </Button>
          <Button danger disabled={selectedIds?.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
        {selectedIds.length > 0 && (
          <span style={{ fontSize: 13, color: '#64748b' }}>已选择 {selectedIds.length} 项</span>
        )}
      </div>
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <Table
          columns={trashColumns}
          dataSource={data}
          rowSelection={rowSelection}
          pagination={false}
          rowKey={q => q._id}
        />
      </div>
    </>
  );
};

export default QuestionTable;
