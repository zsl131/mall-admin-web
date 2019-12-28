import React from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

  componentDidMount() {
    const item = this.props.item;
    const {setFieldsValue} = this.props.form;
    setFieldsValue(item);

  }
  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="默认提成标准">
            {getFieldDecorator('amount', {rules: [{required: true, message: '默认提成标准不能为空'}]})(<InputNumber placeholder="提成标准"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
