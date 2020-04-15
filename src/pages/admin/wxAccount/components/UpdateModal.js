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

export default UpdateModal;
