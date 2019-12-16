import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

const AddModal = ({
  onOk,
  form: {
    getFieldDecorator,
    getFieldValue,
    validateFieldsAndScroll,
  },
  ...modalProps
}) => {

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 },
    },
  };

  const handleOk = (e) => {
    e.preventDefault();

    validateFieldsAndScroll((errors, values) => {
      if(!errors) {
        onOk(values);
      }
      // console.log("submit", errors, values);
    });
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  }

  return(
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入角色名称"/>)}
        </FormItem>
        {/*<FormItem {...formItemLayout} label="超级管理员">
          {getFieldDecorator("isAdmin")(<Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross" />}/>)}
        </FormItem>*/}
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
