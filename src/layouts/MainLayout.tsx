import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <div>MainLayout header</div>
      <div>
        <Outlet />
      </div>
      <div>MainLayout footer</div>
    </>
  );
}
