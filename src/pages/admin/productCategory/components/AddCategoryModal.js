import React from 'react';
import { Form, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class AddCategoryModal extends React.Component {

  componentDidMount() {
    const item = this.props.category;
    const {setFieldsValue} = this.props.form;
    setFieldsValue({pid: item.id, pname: item.name});
  }

  render() {
    const {
      onOk,
      category,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

    // console.log(modalProps);

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
          {getFieldDecorator("pid")(<Input type="hidden"/>)}
          {getFieldDecorator("pname")(<Input type="hidden"/>)}
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

export default AddCategoryModal;

