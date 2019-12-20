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
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator("taskDesc_like")(<Input placeholder="描述"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("beanName_like")(<Input placeholder="beanName"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("methodName_like")(<Input placeholder="methodName"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="状态">
            <Option value="">==全部==</Option>
            <Option value="1">在运行</Option>
            <Option value="0">已停止</Option>
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
