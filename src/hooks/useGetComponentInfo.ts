import { useSelector } from 'react-redux';
import { StateType } from '../store';
import { ComponentsStateType } from '../store/componentsReducer';

/**
 * 从 store中获取组件列表信息
 */
function useGetComponentInfo() {
  // redux store
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType;

  const { componentList } = components;

  return {
    componentList,
  };
}

export default useGetComponentInfo;
