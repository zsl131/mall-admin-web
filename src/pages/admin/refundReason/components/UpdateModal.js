import React from 'react';
import { Form, Input, InputNumber, Modal, Tooltip } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

  state = {
    bgColor: '',
    icon: '',
    status: false,
  };

  componentDidMount() {
    const item = this.props.item;
    const {setFieldsValue} = this.props.form;
    setFieldsValue(item);
    this.setState({bgColor: item.bgColor, icon: item.icon, status: item.status==="1"});
  }
  render() {
    const {form} = this.props;
    const { getFieldDecorator, validateFieldsAndScroll} = form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    return(
      <Modal {...this.props} onOk={handleOk} >
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="原因">
            {getFieldDecorator('reason', {rules: [{required: true, message: '原因不能为空'}]})(<Input placeholder="输入原因，建议不要太长"/>)}
          </FormItem>

          <FormItem {...formItemLayout} label="序号">
            <Tooltip title="排序序号，越小排在越前面">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})( <InputNumber placeholder="排序序号"/>)}
            </Tooltip>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
