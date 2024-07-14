import { Button, Checkbox, Form, Input, Space } from 'antd';
import { Typography } from 'antd';
import React from 'react';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { REGISTER_PATHNAME } from '../../router';

const { Title } = Typography;

export default function Login() {
  const handleLogin = (values: any) => {
    console.log('login', values);
  };
  return (
    <div className={styles.container}>
      <Title level={2}>登录</Title>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
            {
              pattern: /^\w+$/,
              message: '只能输入字母数字下划线',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码">
          <Input type="password" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5, span: 17 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              用户登录
            </Button>
            <Link to={REGISTER_PATHNAME}>注册新用户</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
