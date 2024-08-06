import { Meta, StoryObj } from '@storybook/react';

import Component from '../../components/QuestionComponents/QuestionTitle/Component';

const meta = {
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const setProps: Story = {
  args: {
    text: '测试标题',
    level: 2,
    isCenter: true,
  },
};
