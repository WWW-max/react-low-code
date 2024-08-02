/**
 * 组件属性设置面板
 */
import React, { ComponentProps, FC } from 'react';
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo';
import {
  ComponentPropsType,
  getComponentConfByType,
} from '../../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import { changeComponentProps } from '../../../../store/componentsReducer';

/** 未选中组件 */
const NoProp: FC = () => <div style={{ textAlign: 'center' }}>未选中组件</div>;
const ComponentProp: FC = () => {
  const dispatch = useDispatch();

  const { selectedComponent } = useGetComponentInfo();
  if (!selectedComponent) return <NoProp />;

  const { type, props, isLocked, isHidden } = selectedComponent;
  const ComponentConf = getComponentConfByType(type);
  if (ComponentConf == null) return <NoProp />;

  /** 设置组件属性 */
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  const { PropComponent } = ComponentConf;
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />;
};

export default ComponentProp;
