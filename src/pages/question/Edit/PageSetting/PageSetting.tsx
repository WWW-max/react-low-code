import { Form, Input } from 'antd';
import React, { FC, useEffect } from 'react';
import useGetPageInfo from '../../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { resetPageInfo } from '../../../../store/pageInfoReducer';
import TextArea from 'antd/es/input/TextArea';

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // 实时更新表单内容
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  // 更新页面信息
  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }
  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" allowClear />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="问卷描述..." allowClear />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="输入 CSS 样式代码..." allowClear />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="输入 JS 脚本代码..." allowClear />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
