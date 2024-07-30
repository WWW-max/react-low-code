import { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';

/** 统一 各个组件的 props type */
type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;
/** 统一 组件的 配置 type */
type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
};

/** 全部的组件的配置泪飙 */
const componentConfList: ComponentConfType[] = [QuestionTitleConf, QuestionInputConf];

/** 根据组件类型获取组件配置信息方法 */
export function getComponentConfByType(type: string) {
  return componentConfList.find(conf => conf.type === type);
}
