import React, { FC } from 'react';
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component';
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentInfoType } from '../../../store/componentsReducer';
import { getComponentConfByType } from '../../../components/QuestionComponents';

type PropsType = {
  loading: boolean;
};

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { componentList } = useGetComponentInfo();
  const genComponent = (componentInfo: ComponentInfoType) => {
    const { type } = componentInfo; // 从redux store中获取的（服务器中获取）每个组件的信息

    const componentConf = getComponentConfByType(type); // 根据组件类型获取组件配置信息
    if (componentConf == null) return null;
    const { Component } = componentConf;
    return <Component />;
  };
  return (
    <div>
      {componentList.map(cinfo => {
        return <div key={cinfo.fe_id}>{genComponent(cinfo)}</div>;
      })}
    </div>
  );
};

export default EditCanvas;
