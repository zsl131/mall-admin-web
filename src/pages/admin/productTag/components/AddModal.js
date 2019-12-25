import React from 'react';
import { Form, Input, Modal } from 'antd';
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
          <FormItem {...formItemLayout} label="产品标签">
            {getFieldDecorator('name', {rules: [{required: true, message: '标签名称不能为空'}]})(<Input placeholder="输入标签名称"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;

