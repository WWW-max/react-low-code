/** 多选框 选项type */
export type OptionType = {
  value: string;
  text: string;
  checked: boolean;
};

/** 多选框 props type */
export type QuestionCheckboxPropsType = {
  title?: string;
  isVertical?: boolean;
  list?: OptionType[];

  // 用于PropComponent
  onChange?: (newProps: QuestionCheckboxPropsType) => void;
  disabled?: boolean;
};

/** 单选按钮 props 默认值 */
export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选框标题',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false },
  ],
};
