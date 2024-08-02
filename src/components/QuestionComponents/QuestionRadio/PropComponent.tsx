import React, { FC, useEffect } from 'react';
import { OptionType, QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const {
    title,
    isVertical,
    value,
    options = [],
    onChange,
  } = { ...QuestionRadioDefaultProps, ...props };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options });
  }, [title, isVertical, value, options]);

  function handleValuesChange() {
    if (onChange) {
      const newValues = form.getFieldsValue();

      if (newValues.options) {
        // 需要清除text undefined 选项
        newValues.options = newValues.options.filter((opt: OptionType) => !(opt.text == null));
      }

      const { options = [] } = newValues;
      options.forEach((opt: OptionType) => {
        if (opt.value) return;
        opt.value = nanoid(5); // 补齐 opt value
      });

      onChange(newValues);
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项（可删除） */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项 输入框 */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: async (_, text) => {
                            const { options = [] } = await form.getFieldsValue();
                            let num = 0;
                            options.forEach((opt: OptionType) => {
                              if (opt.text === text) {
                                // 记录text相同的个数，预期只有一个（自身）
                                num++;
                              }
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error(`和其它选项重复了${num}`));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字..." />
                    </Form.Item>

                    {/* 当前选项，删除按钮 */}
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                );
              })}

              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖直排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
