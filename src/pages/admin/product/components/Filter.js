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
        {getFieldDecorator("title_like")(<Input placeholder="产品名称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("cateName_like")(<Input placeholder="分类名称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("saleMode")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="销售模式">
            <Option value="">==全部==</Option>
            <Option value="1">当季</Option>
            <Option value="2">预售</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("isRecommend")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="是否推荐">
            <Option value="">==全部==</Option>
            <Option value="0">不推荐</Option>
            <Option value="1">推荐</Option>
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
