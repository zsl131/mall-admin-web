import React from 'react';
import { Form, Input, Modal } from 'antd';
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
          <FormItem {...formItemLayout} label="产品标签">
            {getFieldDecorator('name', {rules: [{required: true, message: '标签名称不能为空'}]})(<Input placeholder="输入标签名称"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
