import { render, screen } from '@testing-library/react';

import Component from './Component';

test('默认属性', () => {
  render(<Component />);

  const p = screen.getByText('问卷标题');
  expect(p).toBeInTheDocument();
});
test('输入属性', () => {
  render(<Component title="testTitle" desc="testDesc" />);

  const p = screen.getByText('testTitle');
  expect(p).toBeInTheDocument();

  const textarea = screen.getByText('testDesc');
  expect(textarea).toBeInTheDocument();
});
