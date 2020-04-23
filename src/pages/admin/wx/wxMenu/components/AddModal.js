import React from 'react';
import { Form, Input, InputNumber, Modal, Radio } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class AddModal extends React.Component {

  state = {
    type: ''
  };

  render() {
    const {
      onOk,
      menu,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          if(menu) {values.pid = menu.id;} //设置pid
          onOk(values);
        }
      });
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const onRadioChange = (e) => {
      const val = e.target.value;
      this.setState({type: val});
    };

    const {type} = this.state;

    return(
      <Modal {...modalOpts} >
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="菜单名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '菜单名称不能为空'}]})(<Input placeholder="输入菜单名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<InputNumber placeholder="输入菜序号"/>)}
          </FormItem>

          <FormItem {...formItemLayout} label="菜单类型">
            {getFieldDecorator("type", {rules: [{required: true, message: '菜单类型不能为空'}]})(
              <Radio.Group onChange={onRadioChange}>
                <Radio value="view">view</Radio>
                <Radio value="click">click</Radio>
                <Radio value="miniprogram">小程序</Radio>
              </Radio.Group>
            )}
          </FormItem>

          {
            type==='miniprogram' &&
            <div>
              <FormItem {...formItemLayout} label="appID">
                {getFieldDecorator('appid', {rules: [{required: true, message: '小程序APPID不能为空'}]})(<Input placeholder="输入小程序AppId"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="访问地址">
                {getFieldDecorator('pagePath', {rules: [{required: true, message: '小程序访问地址不能为空'}]})(<Input placeholder="输入小程序访问地址"/>)}
              </FormItem>
            </div>
          }
          {
            type==='view' &&
            <div>
              <FormItem {...formItemLayout} label="链接地址">
                {getFieldDecorator('url', {rules: [{required: true, message: '链接地址不能为空'}]})(<Input placeholder="输入链接地址"/>)}
              </FormItem>
            </div>
          }
          {
            type==='click' &&
            <div>
              <FormItem {...formItemLayout} label="点击值">
                {getFieldDecorator('optKey', {rules: [{required: true, message: '点击值不能为空'}]})(<Input placeholder="输入点击值"/>)}
              </FormItem>
            </div>
          }

          <FormItem {...formItemLayout} label="状态">
            {getFieldDecorator('status', {rules: [{required: true, message: '状态不能为空'}]})(
              <Radio.Group>
                <Radio value="0">不展示</Radio>
                <Radio value="1">展示</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;

