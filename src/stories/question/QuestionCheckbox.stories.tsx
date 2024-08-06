import type { Meta, StoryObj } from '@storybook/react';

import Component from '../../components/QuestionComponents/QuestionCheckbox/Component';

const meta = {
  component: Component,
} satisfies Meta<typeof Component>; // satisfies -> TS 4.9中引入的新特性，用于表示一个类型满足另一个类型的要求

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetProps: Story = {
  args: {
    title: '测试问卷标题',
    list: [
      { value: 'v1', text: 't1', checked: true },
      { value: 'v2', text: 't2', checked: false },
      { value: 'v3', text: 't3', checked: true },
    ],
    isVertical: true,
  },
};
