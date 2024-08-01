import React from 'react';
import { Typography, Input } from 'antd';
import { QuestionTextareaDefaultProps, QuestionTextareaPropsType } from './interface';

const { Paragraph } = Typography;
const { TextArea } = Input;

export default function QuestionTextarea(props: QuestionTextareaPropsType) {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  );
}
