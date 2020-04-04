import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

const AddModal = ({
  onOk,
  form: {
    getFieldDecorator,
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
    });
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  }

  return(
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="短信签名">
          {getFieldDecorator('sign', {rules: [{required: true, message: '短信签名不能为空'}]})(<Input placeholder="输入短信签名（公司名称或应用名称）"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="短信内容">
          {getFieldDecorator('content', {rules: [{required: true, message: '短信内容不能为空'}]})(<Input placeholder="输入短信内容，如：您的验证码是#code#"/>)}
        </FormItem>
        <p style={{"textAlign": "center", "width":"100%"}}>提交后数据直接提交到接口中心，中心验证通过后将不可再修改</p>

      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
