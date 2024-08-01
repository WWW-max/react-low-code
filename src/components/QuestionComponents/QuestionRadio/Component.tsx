import React from 'react';
import { Radio, Space, Typography } from 'antd';
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface';

const { Paragraph } = Typography;
export default function QuestionRadio(props: QuestionRadioPropsType) {
  const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(option => {
            const { value, text } = option;
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
}
