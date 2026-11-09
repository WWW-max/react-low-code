import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../../router';
import { loginServices } from '../../services/user';
import { setUserToken } from '../../utils/user-token';

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
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>账号登录</h2>
          <p className={styles.desc}>登录问卷低代码平台管理您的调研项目</p>
        </div>
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          form={form}
          requiredMark={false}
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
            <Input size="large" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 16 }}>
            <Checkbox>记住登录状态</Checkbox>
          </Form.Item>
          <Form.Item style={{ marginBottom: 16 }}>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
          <div className={styles.footer}>
            <span>还没有账号？</span>
            <Link to={REGISTER_PATHNAME}>注册新用户</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
