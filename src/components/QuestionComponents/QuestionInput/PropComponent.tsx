import React, { FC, useEffect } from 'react';
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface';
import { Form, Input } from 'antd';

const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder, onChange } = { ...QuestionInputDefaultProps, ...props };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form layout="vertical" form={form} onValuesChange={handleValuesChange}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input allowClear />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
