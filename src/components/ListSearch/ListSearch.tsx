import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default function ListSearch() {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSearch = (value: string) => {
    console.log('onSearch', value);
  };
  return (
    <Search
      size="large"
      allowClear
      placeholder="输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '260px' }}
    />
  );
}
