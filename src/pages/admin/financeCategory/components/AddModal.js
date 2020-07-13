import React from 'react';
import { Form, Input, Modal, Radio } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const AddModal = ({
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  ...modalProps
}) => {

  const handleOk = (e) => {
    e.preventDefault();

    validateFieldsAndScroll((errors, values) => {
      if(!errors) {
        onOk(values);
      }
    });
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  };

  return(
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="分类类别">
          {getFieldDecorator('flag', {rules: [{required: true, message: '请选择类别'}]})(
            <RadioGroup>
              <Radio value="1">进账</Radio>
              <Radio value="-1">出账</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="分类名称">
          {getFieldDecorator('name', {rules: [{required: true, message: '分类名称不能为空'}]})(<Input placeholder="输入分类名称"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
