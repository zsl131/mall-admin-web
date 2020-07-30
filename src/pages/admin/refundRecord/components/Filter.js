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
        {getFieldDecorator("ordersNo_like")(<Input placeholder="订单号"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("refundNo_like")(<Input placeholder="退款单号"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("ordersProTitle_like")(<Input placeholder="产品标题"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("agentName_like")(<Input placeholder="代理姓名"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("optName_like")(<Input placeholder="操作员"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("resCodeDes_like")(<Input placeholder="结果信息"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="状态">
            <Option value="">==全部==</Option>
            <Option value="0">成功</Option>
            <Option value="-1">失败</Option>
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
