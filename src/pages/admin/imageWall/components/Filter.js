import React from 'react';
import { Button, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
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
        {getFieldDecorator("content_like")(<Input placeholder="公告内容"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="显示状态">
            <Option value="">==全部==</Option>
            <Option value="0">不显示</Option>
            <Option value="1">可显示</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("relationProTitle_like")(<Input placeholder="关联产品"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("relationFlag")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="是否关联">
            <Option value="">==全部==</Option>
            <Option value="0">未关联</Option>
            <Option value="1">已关联</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        <Button type="dashed" htmlType="submit">筛选</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Filter);
