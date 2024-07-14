import { Button, Form, Space } from 'antd';
import Input from 'antd/es/input/Input';
import Link from 'antd/es/typography/Link';
import React from 'react';
import styles from './Register.module.scss';
export default function Register() {
  const onFinish = (values: any) => {
    console.log('success', values);
  };
  return (
    <div className={styles.container}>
      <div>
        <h1>注册新用户</h1>
      </div>
      <div>
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            name="username"
            label="用户名："
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在5-20之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']} // 依赖于 password ，password 变化，会重新触发 validator
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error('两次密码不一致'));
                  }
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item name="nickname" label="昵称">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 1, span: 18 }}>
            <Space size="middle">
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link href="/login">已有账号，去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
