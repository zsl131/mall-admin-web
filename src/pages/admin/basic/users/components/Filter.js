import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Filter = ({
  onFilter,
  form: {
    getFieldDecorator,
    getFieldsError,
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
        {getFieldDecorator("username_like")(<Input placeholder="用户名"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("nickname_like")(<Input placeholder="用户昵称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="用户状态">
            <Option value="">==全部==</Option>
            <Option value="1">启用</Option>
            <Option value="0">停用</Option>
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
