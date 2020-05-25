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
        {getFieldDecorator("name_like")(<Input placeholder="姓名"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("nickname_like")(<Input placeholder="昵称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("phone_like")(<Input placeholder="电话"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("ownCode_like")(<Input placeholder="代理邀请码"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("levelName_like")(<Input placeholder="等级名称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("leaderCode_like")(<Input placeholder="推荐邀请码"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("leaderName_like")(<Input placeholder="推荐者姓名"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("leaderPhone_like")(<Input placeholder="推荐者电话"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="状态">
            <Option value="">==全部==</Option>
            <Option value="0">待审核</Option>
            <Option value="1">审核通过</Option>
            <Option value="2">审核被驳回</Option>
          </Select>
        )}
      </FormItem>
      {/*<FormItem>
        {getFieldDecorator("hasExperience")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="有无经验">
            <Option value="">==全部==</Option>
            <Option value="0">无经验</Option>
            <Option value="1">有经验</Option>
          </Select>
        )}
      </FormItem>*/}
      <FormItem>
        <Button type="dashed" htmlType="submit">筛选</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Filter);
