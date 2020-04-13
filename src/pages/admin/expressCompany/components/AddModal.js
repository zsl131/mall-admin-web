import React from 'react';
import { Form, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;
const {TextArea} = Input;

@Form.create()
class AddModal extends React.Component {

  state = {
    fetching: false,
    keyword: '',
    proList: []
  };

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        setFieldsValue
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
          <FormItem {...formItemLayout} label="物流公司名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '物流公司名称不能为空'}]})(<Input placeholder="输入物流公司名称"/>)}
          </FormItem>

          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('remark')(<TextArea rows={5} placeholder="输入备注信息">&nbsp;</TextArea>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;

