import React from 'react';
import { Form, Icon, Input, InputNumber, Modal, Switch } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class AddModal extends React.Component {

  state = {
    bgColor: "",
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
        values.status = values.status?"1":"0";
        if(!errors) {
          onOk(values);
        }
      });
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const onColorChange = (e) => {
      this.setState({bgColor: e.target.value});
    };

    return(
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('txt', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入名称，建议4个字"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="小字说明">
            {getFieldDecorator('smallTxt', {rules: [{required: true, message: '小字说明不能为空'}]})(<Input placeholder="输入小字说明，建议4个字"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo')(<InputNumber placeholder="排序序号"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="背景颜色">
            {getFieldDecorator('bgColor')(<Input addonAfter={<span style={{"color":this.state.bgColor}}>效果</span>} onChange={onColorChange} placeholder="背景颜色"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="链接地址">
            {getFieldDecorator('path', {rules: [{required: true, message: '链接地址不能为空'}]})(<Input placeholder="输入链接地址"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="显示状态">
            {getFieldDecorator("status")(<Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="close" />}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;

