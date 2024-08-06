import { Meta, StoryObj } from '@storybook/react';

import Component from '../../components/QuestionComponents/QuestionInfo/Component';

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
    title: '测试Info title',
    desc: '测试Info desc',
  },
};
export const DescBreakLine: Story = {
  args: {
    title: '测试desc 换行',
    desc: '描述1\n描述2\n描述3',
  },
};
