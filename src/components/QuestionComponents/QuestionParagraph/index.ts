import Component from './Component';
import { QuestionParagraphDefaultProps } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

/** 导出问卷段落组件配置对象 */
export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
};
