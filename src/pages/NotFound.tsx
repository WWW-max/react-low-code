import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const NotFound: React.FC = () => {
  const nav = useNavigate();
  const goBack = () => {
    nav('/');
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，访问页面不存在！"
      extra={
        <Button type="primary" onClick={goBack}>
          返回首页
        </Button>
      }
    />
  );
};

export default NotFound;
