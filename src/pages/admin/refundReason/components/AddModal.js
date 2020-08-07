import React from 'react';
import { Form, Input, InputNumber, Modal, Tooltip } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class AddModal extends React.Component {

  state = {
    bgColor: "",
    icon:'',
  };

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
      <Modal {...modalOpts}>
        <Form layout="horizontal">
            <FormItem {...formItemLayout} label="原因">
              {getFieldDecorator('reason', {rules: [{required: true, message: '原因不能为空'}]})(<Input placeholder="输入原因，建议不要太长"/>)}
            </FormItem>

            <FormItem {...formItemLayout} label="序号">
              <Tooltip title="排序序号，越小排在越前面">
              {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<InputNumber placeholder="排序序号"/>)}
              </Tooltip>
            </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;

