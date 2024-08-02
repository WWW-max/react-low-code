import React, { FC, useEffect } from 'react';
import { QuestionTextareaDefaultProps, QuestionTextareaPropsType } from './interface';
import { Form, Input } from 'antd';

const PropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder, onChange, disabled } = { ...QuestionTextareaDefaultProps, ...props };
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
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
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
