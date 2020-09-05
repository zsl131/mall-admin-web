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
        {getFieldDecorator("proTitle_like")(<Input placeholder="产品标题"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("specsName_like")(<Input placeholder="产品规格"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("customNickname_like")(<Input placeholder="顾客昵称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("cashOutBatchNo_like")(<Input placeholder="批次号"/>)}
      </FormItem>

      <FormItem>
        {getFieldDecorator("status")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="状态">
            <Option value="">==全部==</Option>
            <Option value="-1">已取消</Option>
            <Option value="0">未付款</Option>
            <Option value="1">已付款</Option>
            <Option value="2">可提现</Option>
            <Option value="3">纳入结算</Option>
            <Option value="4">已转款</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("isAuto")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="模式">
            <Option value="">==全部==</Option>
            <Option value="1">自动抵扣佣金</Option>
            <Option value="0">非自动抵扣佣金</Option>
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
