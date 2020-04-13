import React from 'react';
import { Form, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;
const {TextArea} = Input;

@Form.create()
class UpdateModal extends React.Component {

  state = {
    fetching: false,
    keyword: '',
    proList: []
  };

  componentDidMount() {
    const item = this.props.item;
    const {setFieldsValue} = this.props.form;
    setFieldsValue(item);
  }
  render() {

    const {form} = this.props;
    const { getFieldDecorator, validateFieldsAndScroll,setFieldsValue} = form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        values.status = values.status?"1":"0";
        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
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

export default UpdateModal;
