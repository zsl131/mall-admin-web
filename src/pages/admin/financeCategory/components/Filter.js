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
      // console.log("filter", errors, values);
      onFilter(values);
    });
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator("flag")(
          <Select
            placeholder="账目标记"
            style={{ width: '120px' }}
          >
            <Option key="*">=全部=</Option>
            <Option key="1">进账</Option>
            <Option key="-1">出账</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("name_like")(<Input placeholder="名称"/>)}
      </FormItem>
      <FormItem>
        <Button type="dashed" htmlType="submit">筛选</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Filter);
