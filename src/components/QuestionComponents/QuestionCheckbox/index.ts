import Component from './Component';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';
import { QuestionCheckboxDefaultProps } from './interface';

export * from './interface';

export default {
  title: '多选框',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
};
