/**
 * 问卷 多选框
 */
import React from 'react';
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface';
import { Checkbox, Space, Typography } from 'antd';

const { Paragraph } = Typography;
export default function Component(props: QuestionCheckboxPropsType) {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((option: any) => {
          const { value, text, checked } = option;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
}
