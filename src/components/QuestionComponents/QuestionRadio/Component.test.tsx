import React from 'react';
import { render, screen } from '@testing-library/react';

import Component from './Component';
/**
 * 测试组件 - QuestionRadio - 测试用例
 */
test('默认属性', () => {
  render(<Component />);
  const p = screen.getByText('单选框标题');
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${1}`);
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(`选项${i}`);
    expect(label).toBeInTheDocument();
  }
});
test('传入属性', () => {
  const opts = [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' },
  ];
  render(<Component title="testTitle" options={opts} value="v1" />);

  const p = screen.getByText('testTitle');
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const curVal = `v${i}`;
    const radio = screen.getByDisplayValue(`v${i}`);
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(`t${i}`);
    expect(label).toBeInTheDocument();

    // 选中的
    if (curVal === 'v1') {
      expect(radio.getAttribute('checked')).not.toBeNull();
    }
  }
});
