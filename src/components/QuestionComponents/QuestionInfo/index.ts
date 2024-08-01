import Component from './Component';
import { QuestionInfoDefaultProps } from './interface';

export * from './interface';

/** 导出问卷信息组件配置对象 */
export default {
  title: '问卷对象',
  type: 'questionInfo',
  Component,
  defaultProps: QuestionInfoDefaultProps,
};
