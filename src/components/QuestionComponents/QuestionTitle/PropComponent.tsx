import { Checkbox, Form, Input, Select } from 'antd';
import React, { FC, useEffect } from 'react';
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from './interface';

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text, level, isCenter, onChange, disabled } = { ...QuestionTitleDefaultProps, ...props };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter, disabled]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      form={form}
      onValuesChange={handleValuesChange}
      initialValues={{ text, level, isCenter }}
      disabled={disabled}
    >
      <Form.Item label="标题" name="text" rules={[{ required: true, message: '请输入标题' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label="级别" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
