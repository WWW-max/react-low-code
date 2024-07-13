import React from 'react';
import { Tag } from 'antd';
import type { TableProps } from 'antd/es/table';

export type DataType = {
  key?: number;
  _id: number;
  title: string;
  createdAt: string;
  isStar: boolean;
};
/** 回收站表格列 */
export const trashColumns: TableProps<DataType>['columns'] = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="blue">已发布</Tag> : <Tag>未发布</Tag>;
    },
  },
  {
    title: '答卷数量',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
];
