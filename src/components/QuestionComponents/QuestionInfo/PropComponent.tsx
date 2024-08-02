import React, { FC, useEffect } from 'react';
import { Form, Input } from 'antd';
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from './interface';

const { TextArea } = Input;
const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = { ...QuestionInfoDefaultProps, ...props };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc]);
  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      layout="vertical"
      // initialValues={{ title, desc }}
      onValuesChange={handleValuesChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入问卷标题' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea allowClear />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
