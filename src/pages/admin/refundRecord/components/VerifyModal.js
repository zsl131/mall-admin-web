import React from 'react';
import { Form, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class VerifyModal extends React.Component {

  render() {
    const {
      onOk,
      item,
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
          values.id = item.id;
          values.flag = "2";
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
            <FormItem {...formItemLayout} label="驳回原因">
              {getFieldDecorator('reason', {rules: [{required: true, message: '驳回原因不能为空'}]})(<Input placeholder="输入驳回原因"/>)}
            </FormItem>

        </Form>
      </Modal>
    );
  }
}

export default VerifyModal;

