import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { LIST_SEARCH_PARAM_KEY } from '../../constant';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
const { Search } = Input;

export default function ListSearch() {
  const [value, setValue] = useState('');
  const { pathname } = useLocation();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setValue(curVal);
  }, [searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSearch = (value: string) => {
    // 跳转页面，增加 url 参数
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`, // 去掉了 page pageSize, 加上keyword
    });
  };
  return (
    <Search
      allowClear
      placeholder="搜索问卷标题..."
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '260px' }}
    />
  );
}
