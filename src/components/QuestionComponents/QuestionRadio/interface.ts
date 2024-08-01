/** 单选框 选项 type */
export type OptionType = {
  value: string;
  text: string;
};
/** 问卷 单选框 props type*/
export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  value?: string;

  // 用于PropComponent
  onChange?: (newProps: QuestionRadioPropsType) => void;
  disabled?: boolean;
};

/** 单选框 props 默认值 */
export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选框标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' },
  ],
  value: '',
};
