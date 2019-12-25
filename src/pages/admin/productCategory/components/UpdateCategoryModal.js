import React from 'react';
import { Form, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class UpdateCategoryModal extends React.Component {

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
          <FormItem {...formItemLayout} label="分类名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '分类名称不能为空'}]})(<Input placeholder="输入分类名称"/>)}
          </FormItem>

          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<Input placeholder="输入序号"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default UpdateCategoryModal;
