import type { Meta, StoryObj } from '@storybook/react';

import Component from '../../components/QuestionComponents/QuestionInput/Component';

const meta = {
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetProps: Story = {
  args: {
    title: '测试输入框标题',
    placeholder: '请输入',
  },
};
