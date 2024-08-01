import { FC } from 'react';

/** 标题 */
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';
/** 页面信息 */
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo';
/** 段落 */
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph';
/** 输入框 */
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
/** 多行输入框 */
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea';
/** 多选框 */
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from './QuestionCheckbox';
/** 单选框 */
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio';

/** 统一 各个组件的 props type */
type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionInfoPropsType &
  QuestionParagraphPropsType &
  QuestionTextareaPropsType &
  QuestionCheckboxPropsType &
  QuestionRadioPropsType;
/** 统一 组件的 配置 type */
type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
};

/** 全部的组件的配置列表 */
const componentConfList: ComponentConfType[] = [
  QuestionTitleConf,
  QuestionInfoConf,
  QuestionParagraphConf,
  QuestionInputConf,
  QuestionTextareaConf,
  QuestionCheckboxConf,
  QuestionRadioConf,
];

/** 根据组件类型获取组件配置信息方法 */
export function getComponentConfByType(type: string) {
  return componentConfList.find(conf => conf.type === type);
}
