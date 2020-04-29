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
        {getFieldDecorator("agentName_like")(<Input placeholder="代理姓名"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("agentPhone_like")(<Input placeholder="代理电话"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("customNickname_like")(<Input placeholder="昵称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="状态">
            <Option value="">==全部==</Option>
            <Option value="0">未领完</Option>
            <Option value="1">已领完</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        <Button type="dashed" htmlType="submit">筛选</Button>
      </FormItem>
    </Form>
  );
};

export default Form.create()(Filter);
