import { render, screen } from '@testing-library/react';
import Component from './Component';

test('默认属性', () => {
  render(<Component />); // 渲染组件
  const p = screen.getByText('段落内容');
  expect(p).toBeInTheDocument();
});
test('传入属性', () => {
  render(<Component text="testText" isCenter={true} />);

  const span = screen.getByText('testText');
  expect(span).toBeInTheDocument();

  const p = span.parentElement; // 父元素
  expect(p).not.toBeNull();

  const style = p!.style || {};
  expect(style.textAlign).toBe('center');
});
