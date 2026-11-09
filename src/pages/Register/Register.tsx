import { Button, Form, Input, message } from 'antd';
import React from 'react';
import styles from './Register.module.scss';
import { useRequest } from 'ahooks';
import { registerServices } from '../../services/user';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../../router';

export default function Register() {
  const nav = useNavigate();
  const { run, loading } = useRequest(
    async values => {
      const { username, password, nickname } = values;
      const data = await registerServices({ username, password, nickname });
      return data;
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功！');
        nav(LOGIN_PATHNAME); // 跳转到登录页
      },
    }
  );
  const onFinish = (values: any) => {
    run(values);
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>注册新用户</h2>
          <p className={styles.desc}>创建您的问卷工作台账号</p>
        </div>
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在5-20之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input size="large" placeholder="5-20位字母、数字或下划线" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']} // 依赖于 password ，password 变化，会重新触发 validator
            rules={[
              { required: true, message: '请再次输入密码' },
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
            <Input.Password size="large" placeholder="请再次输入密码" />
          </Form.Item>
          <Form.Item name="nickname" label="昵称">
            <Input size="large" placeholder="请输入显示昵称（选填）" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 16, marginTop: 8 }}>
            <Button type="primary" htmlType="submit" size="large" loading={loading} block>
              注册账号
            </Button>
          </Form.Item>
          <div className={styles.footer}>
            <span>已有账号？</span>
            <Link to={LOGIN_PATHNAME}>去登录</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
