/**
 * 问卷 输入框
 */
import Component from './Component';
import { QuestionInputDefaultProps } from './interface';

export * from './interface';

/** 输入框组件的配置信息 */
export default {
  title: '输入框',
  type: 'questionInput', // 与后端统一好的组件类型，必须唯一
  Component, // 画布中显示的组件
  defaultProps: QuestionInputDefaultProps,
};
