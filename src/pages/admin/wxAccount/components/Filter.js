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
        {getFieldDecorator("nickname_like")(<Input placeholder="昵称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="关注状态">
            <Option value="">==全部==</Option>
            <Option value="0">取消关注</Option>
            <Option value="1">已关注</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("type")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="用户类型">
            <Option value="">==全部==</Option>
            <Option value="0">顾客</Option>
            <Option value="1">代理</Option>
            <Option value="5">员工</Option>
            <Option value="10">管理员</Option>
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
