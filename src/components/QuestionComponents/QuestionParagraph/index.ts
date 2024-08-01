import Component from './Component';
import { QuestionParagraphDefaultProps } from './interface';

export * from './interface';

/** 导出问卷段落组件配置对象 */
export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  defaultProps: QuestionParagraphDefaultProps,
};
