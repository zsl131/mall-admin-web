import React from 'react';
import {Form, Input, Modal, Switch} from 'antd';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
    setFieldsValue({"password":''});
    // setFieldsValue({"nickname":this.props.item.nickname})
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll, getFieldValue} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    const checkPassword = (rule, value, callback) => {
      //console.log("checkPassword", value);
      if(value && (value.length>25 || value.length<4)) {
        callback("密码长度应为：4~25");
      } else {
        callback();
      }
    };

    const checkConfirmPwd = (rule, value, callback) => {
      const conPwd = value === undefined?"":value;
      if(conPwd !== getFieldValue('password')) {
        callback("两次密码输入不一致");
      } else {
        callback();
      }
    }

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          values.isAdmin = (values.isAdmin)?"1":"0";
          values.status = (values.status || values.status === undefined)?'1':'0';
         this.props.onOk(values);
        }
      });
    }

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="用户昵称">
            {getFieldDecorator('nickname', {rules: [{required: true, message: '用户昵称不能为空'}]})(<Input placeholder="输入用户昵称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator("username", {rules: [{required: true, message: '用户名不能为空'}]})(<Input placeholder="输入用户名" disabled={true}/>)}
          </FormItem>

          <FormItem {...formItemLayout} label="登陆密码">
            {getFieldDecorator('password', {rules: [{validator: checkPassword}]})(<Input type="password" placeholder="输入密码"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="重复密码">
            {getFieldDecorator("confirmPwd", {rules: [{validator: checkConfirmPwd}]})(<Input type="password" placeholder="再次输入密码"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="是否启用">
            {getFieldDecorator("status")(<Switch checkedChildren="启用" unCheckedChildren="停用" defaultChecked={this.props.item.status === "1"}/>)}
          </FormItem>
          {/*<FormItem {...formItemLayout} label="超级管理员">
            {getFieldDecorator("isAdmin")(<Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross" />}/>)}
          </FormItem>*/}
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
