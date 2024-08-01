/** 问卷信息 props type */
export type QuestionInfoPropsType = {
  title?: string;
  desc?: string;

  // 用于PropComponent
  onChange?: (newProps: QuestionInfoPropsType) => void;
  disabled?: boolean;
};

/** 问卷信息组件 props 默认值 */
export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述',
};
