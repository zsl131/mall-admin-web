import React from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class AddModal extends React.Component {

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

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
      <Modal {...modalOpts} >
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="等级名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '等级名称不能为空'}]})(<Input placeholder="输入等级名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="等级级别">
            {getFieldDecorator('level', {rules: [{required: true, message: '等级级别不能为空'}]})(<InputNumber placeholder="级别"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;

