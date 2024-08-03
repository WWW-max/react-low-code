/**
 * 问卷 单选框
 */
import Component from './Component';
import { QuestionRadioDefaultProps } from './interface';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';

export * from './interface';

export default {
  title: '单选框',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent,
};
