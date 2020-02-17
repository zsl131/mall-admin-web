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
        {getFieldDecorator("proTitle_like")(<Input placeholder="产品标题"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="预售状态">
            <Option value="">==全部==</Option>
            <Option value="0">取消预售</Option>
            <Option value="1">预售中</Option>
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
