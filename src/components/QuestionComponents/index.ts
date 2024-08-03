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
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
  QuestionCheckboxStatPropsType,
} from './QuestionCheckbox';
/** 单选框 */
import QuestionRadioConf, {
  QuestionRadioPropsType,
  QuestionRadioStatPropsType,
} from './QuestionRadio';

/** 统一 各个组件的 props type */
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionInfoPropsType &
  QuestionParagraphPropsType &
  QuestionTextareaPropsType &
  QuestionCheckboxPropsType &
  QuestionRadioPropsType;

/** 统一 各个组件的统计属性类型 */
type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType;

/** 统一 组件的 配置 type */
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  StatComponent?: FC<ComponentStatPropsType>;
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

/** 组件库面板中的组件分组 */
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    componentsConf: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    componentsConf: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    componentsConf: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

/** 根据组件类型获取组件配置信息方法 */
export function getComponentConfByType(type: string) {
  return componentConfList.find(conf => conf.type === type);
}
