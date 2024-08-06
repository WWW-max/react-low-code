import { render, screen } from '@testing-library/react';
import Component from './Component';

test('默认属性', () => {
  render(<Component />);

  const h = screen.getByText('一行标题');
  expect(h).toBeInTheDocument();

  expect(h.matches('h1')).toBeTruthy();
});
test('传入属性', () => {
  render(<Component text="测试标题" level={2} isCenter={true} />);

  const h = screen.getByText('测试标题');
  expect(h.matches('h2')).toBeTruthy(); // <h2>

  const style = h.style;
  expect(style.textAlign).toBe('center');
});
