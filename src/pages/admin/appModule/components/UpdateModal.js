import React from 'react';
import { Form, Icon, Input, InputNumber, Modal, Switch } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

  state = {
    bgColor: this.props.item.bgColor,
  };

  componentDidMount() {
    const item = this.props.item;
    const {setFieldsValue} = this.props.form;
    setFieldsValue(item);

  }
  render() {

    const {item, form} = this.props;
    const { getFieldDecorator, validateFieldsAndScroll} = form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        values.status = values.status?"1":"0";
        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    const onColorChange = (e) => {
      this.setState({bgColor: e.target.value});
    };

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
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
            {getFieldDecorator("status")(<Switch defaultChecked={item.status==="1"}  checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="close" />}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
