import React from 'react';
import { Outlet } from 'react-router-dom';

export default function ManageLayout() {
  return (
    <div>
      <div>header</div>
      <div>
        <Outlet />
      </div>
      <div>footer</div>
    </div>
  );
}
