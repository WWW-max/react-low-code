import { Pagination } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../../constant';

type PropsType = {
  total: number;
};
const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  /** 从url中获取到page pageSize,  并同步到Pagination组件中 */
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    setCurrent(page);
    const pageSize = parseInt(searchParams.get('pageSize') || '') || 10;
    setPageSize(pageSize);
  }, [searchParams]);
  /** 当page,pageSize改变时，跳转页面(修改url参数) */
  const nav = useNavigate();
  const { pathname } = useLocation();
  const handlePageChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({ pathname, search: searchParams.toString() });
  };
  return (
    <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />
  );
};
export default ListPage;
