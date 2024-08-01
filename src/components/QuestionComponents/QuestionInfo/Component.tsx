/**
 * 问卷信息组件
 */
import React from 'react';
import { Typography } from 'antd';
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from './interface';

const { Title, Paragraph } = Typography;
export default function QuestionInfo(props: QuestionInfoPropsType) {
  const { title, desc } = { ...QuestionInfoDefaultProps, ...props };

  const descTextList = desc?.split('\n');
  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descTextList?.map((item, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {item}
          </span>
        ))}
      </Paragraph>
    </div>
  );
}
