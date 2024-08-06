import type { Meta, StoryObj } from '@storybook/react';

import Component from '../../components/QuestionComponents/QuestionRadio/Component';

const meta = {
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 默认属性 */
export const Default: Story = {
  args: {},
};
/** 传入属性 */
export const setProps: Story = {
  args: {
    title: '测试单选标题',
    options: [
      { value: 'v1', text: 't1' },
      { value: 'v2', text: 't2' },
      { value: 'v3', text: 't3' },
    ],
    value: 'v1',
    isVertical: true,
  },
};
