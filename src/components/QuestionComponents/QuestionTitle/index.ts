/**
 * 问卷 标题
 */
import Component from './Component';
import { QuestionTitleDefaultProps } from './interface';

/** 导出props type 和 默认 props */
export * from './interface';

/** 标题组件的配置信息 */
export default {
  title: '标题',
  type: 'questionTitle', // 与后端统一好的组件类型，必须唯一
  Component, // 画布中显示的组件
  defaultProps: QuestionTitleDefaultProps,
};
