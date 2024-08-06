import { Meta, StoryObj } from '@storybook/react';

import Component from '../../components/QuestionComponents/QuestionTextarea/Component';

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
    title: '测试多行输入框标题',
    placeholder: '测试多行输入框placeholder',
  },
};
