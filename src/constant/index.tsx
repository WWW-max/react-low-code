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
/** 默认的 pageSize */
export const LIST_PAGE_SIZE = 10;

export const LIST_SEARCH_PARAM_KEY = 'keyword';
export const LIST_PAGE_PARAM_KEY = 'page';
export const LIST_PAGE_SIZE_PARAM_KEY = 'pageSize';
/** 统计列表，默认的 pageSize */
export const STAT_PAGE_SIZE = 10;
/** 单选框选项统计饼状图颜色值 */
export const STAT_COLORS = ['#FF2D2D', '#BE77FF', '#2894FF', '#00EC00', '#EAC100', '#FF9D6F'];
