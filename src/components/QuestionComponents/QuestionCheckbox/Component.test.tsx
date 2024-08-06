import React from 'react';
import { render, screen } from '@testing-library/react';

import Component from './Component';

/** 测试用例1 */
test('默认属性', () => {
  render(<Component />);

  const p = screen.getByText('多选框标题');
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const checkbox = screen.getByDisplayValue(`item${i}`);
    expect(checkbox).toBeInTheDocument();
    const label = screen.getByText(`选项${i}`);
    expect(label).toBeInTheDocument();

    expect(checkbox.getAttribute('checked')).toBeNull(); // 每一个Checkbox都没有选中
  }
});
/** 测试用例2 */
it('传入属性', () => {
  const list = [
    { value: 'v1', text: 't1', checked: true },
    { value: 'v2', text: 't2', checked: false },
    { value: 'v3', text: 't3', checked: false },
  ];
  render(<Component title="testTitle" list={list} />);
  const p = screen.getByText('testTitle');
  expect(p).toBeInTheDocument();

  const checkbox1 = screen.getByDisplayValue('v1');
  expect(checkbox1).toBeInTheDocument();
  expect(checkbox1.getAttribute('checked')).not.toBeNull(); // 选中

  const checkbox2 = screen.getByDisplayValue('v2');
  expect(checkbox2).toBeInTheDocument();
  expect(checkbox2.getAttribute('checked')).toBeNull(); // 未选中

  const checkbox3 = screen.getByDisplayValue('v3');
  expect(checkbox3).toBeInTheDocument();
  expect(checkbox3.getAttribute('checked')).toBeNull(); // 未选中
});
