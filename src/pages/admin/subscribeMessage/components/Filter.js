import React from 'react';
import { Button, Form, Input } from 'antd';

const FormItem = Form.Item;
const Filter = ({
  onFilter,
  form: {
    getFieldDecorator,
    validateFields,
  }
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((errors, values) => {
      onFilter(values);
    });
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator("tempId_like")(<Input placeholder="模板ID"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("name_like")(<Input placeholder="模板名称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("sn_like")(<Input placeholder="模板SN"/>)}
      </FormItem>
      <FormItem>
        <Button type="dashed" htmlType="submit">筛选</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Filter);
