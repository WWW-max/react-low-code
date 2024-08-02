import { useSelector } from 'react-redux';
import type { PageInfoType } from '../store/pageInfoReducer';
import { StateType } from '../store';

/**
 * @description 获取页面信息
 */
function useGetPageInfo() {
  const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoType;
  return pageInfo;
}

export default useGetPageInfo;
