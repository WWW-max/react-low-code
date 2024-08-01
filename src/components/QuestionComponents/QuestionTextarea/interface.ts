/** QuestionTextarea 组件 props type */
export type QuestionTextareaPropsType = {
  title?: string;
  placeholder?: string;

  onChange?: (newProps: QuestionTextareaPropsType) => void;
  disabled?: boolean;
};

/** 组件props 默认值 */
export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '多行输入框标题',
  placeholder: '请输入...',
};
