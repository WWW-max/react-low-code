/** 问卷段落组件 props type */
export type QuestionParagraphPropsType = {
  text?: string;
  isCenter?: boolean;

  // 用于PropComponent
  onChange?: (newProps: QuestionParagraphPropsType) => void;
  disabled?: boolean;
};

/** 问卷段落组件 props 默认值 */
export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '段落内容',
  isCenter: false,
};
