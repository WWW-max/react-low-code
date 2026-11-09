import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import router from './router';

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1677ff',
          colorInfo: '#1677ff',
          colorTextBase: '#0f172a',
          colorBgLayout: '#f8fafc',
          borderRadius: 6,
          wireframe: false,
          fontSize: 14,
        },
        components: {
          Button: {
            fontWeight: 500,
            defaultShadow: 'none',
            primaryShadow: 'none',
          },
          Card: {
            borderRadiusLG: 8,
          },
          Table: {
            headerBg: '#f8fafc',
            headerColor: '#475569',
            borderColor: '#e2e8f0',
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
