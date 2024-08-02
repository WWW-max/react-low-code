import { useSelector } from 'react-redux';
import { StateType } from '../store';
import { ComponentsStateType } from '../store/componentsReducer';

/**
 * 从 store中获取组件列表信息
 */
function useGetComponentInfo() {
  // redux store
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType;

  const { selectedId, componentList = [], copiedComponent } = components;

  const selectedComponent = componentList.find(c => c.fe_id === selectedId);

  return {
    selectedId, // 选中的Id
    componentList, // 组件列表
    selectedComponent, // 选中的组件信息
    copiedComponent, // 复制的组件信息
  };
}

export default useGetComponentInfo;
