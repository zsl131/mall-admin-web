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
        {getFieldDecorator("ordersNo_like")(<Input placeholder="订单编号"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("proTitle_like")(<Input placeholder="产品标题"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("specsName_like")(<Input placeholder="规格名称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("nickname_like")(<Input placeholder="购买者昵称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="状态">
            <Option value="">==全部==</Option>
            <Option value="-10">已删除</Option>
            <Option value="-2">售后订单</Option>
            <Option value="-1">已关闭</Option>
            <Option value="0">未付款</Option>
            <Option value="1">付款未发货</Option>
            <Option value="2">付款已发货</Option>
            <Option value="3">收货未评价</Option>
            <Option value="4">订单完成</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status_ne")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="删除标记">
            <Option value="">==全部==</Option>
            <Option value="-10">不显示删除订单</Option>
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
