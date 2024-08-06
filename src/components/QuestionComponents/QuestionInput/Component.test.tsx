import { render, screen } from '@testing-library/react';

import Component from './Component';

test('默认属性', () => {
  render(<Component />);

  const p = screen.getByText('输入框标题');
  expect(p).toBeInTheDocument();

  const input = screen.getByPlaceholderText('请输入...');
  expect(input).toBeInTheDocument();
});
test('传入属性', () => {
  render(<Component title="testTitle" placeholder="testPlaceholder" />);

  const p = screen.getByText('testTitle');
  expect(p).toBeInTheDocument();

  const input = screen.getByPlaceholderText('testPlaceholder');
  expect(input).toBeInTheDocument();
});
