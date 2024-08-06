import { render, screen } from '@testing-library/react';

import Component from './Component';

test('默认属性', () => {
  render(<Component />);

  const p = screen.getByText('多行输入框标题');
  expect(p).toBeInTheDocument();

  const textarea = screen.getByPlaceholderText('请输入...');
  expect(textarea).toBeInTheDocument();
});
test('输入属性', () => {
  render(<Component title="testTitle" placeholder="testPlaceHolder" />);

  const p = screen.getByText('testTitle');
  expect(p).toBeInTheDocument();

  const textarea = screen.getByPlaceholderText('testPlaceHolder');
  expect(textarea).toBeInTheDocument();
});
