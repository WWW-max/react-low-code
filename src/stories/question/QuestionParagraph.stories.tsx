import { Meta, StoryObj } from '@storybook/react';

import Component from '../../components/QuestionComponents/QuestionParagraph/Component';

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
    text: '测试段落内容',
    isCenter: true,
  },
};
export const BreakLine: Story = {
  args: {
    text: '段落换行\n段落2\n段落3',
    isCenter: true,
  },
};
