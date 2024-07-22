import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import { Typography } from 'antd';
import React, { useEffect } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../../router';
import { loginServices } from '../../services/user';
import { setUserToken } from '../../utils/user-token';

const { Title } = Typography;

const USER_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

/** 存储用户名密码到本地 */
const rememberUserToStorage = (username: string, password: string) => {
  localStorage.setItem(USER_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
};
/** 获取用户名密码 */
const getUserFromStorage = () => {
  return {
    username: localStorage.getItem(USER_KEY) || '',
    password: localStorage.getItem(PASSWORD_KEY),
  };
};
const deleteUserFromStorage = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(PASSWORD_KEY);
};

export default function Login() {
  const nav = useNavigate();

  const [form] = Form.useForm(); // 第三方hooks

  useEffect(() => {
    const { username, password } = getUserFromStorage();
    form.setFieldsValue({ username, password });
  }, []);
  const handleLogin = async (values: any) => {
    const { username, password, remember } = values;
    const res = await loginServices({ username, password });
    if (res?.token) {
      setUserToken(res?.token || ''); // 存储token

      message.success('登录成功！');
      nav(MANAGE_INDEX_PATHNAME); // 导航到我的问卷
    }

    if (remember) {
      // 记住用户名密码
      rememberUserToStorage(username, password);
    } else {
      deleteUserFromStorage();
    }
  };
  return (
    <div className={styles.container}>
      <Title level={2}>登录</Title>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        form={form}
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
