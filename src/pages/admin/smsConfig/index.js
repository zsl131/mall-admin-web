import React from 'react';
import {connect} from 'dva';
import {Button, Card, Form, Icon, Input} from 'antd';

import styles from './index.css';

const FormItem = Form.Item;

@Form.create()
class SmsConfig extends React.Component {

  state = {
    //item: this.props.smsConfig.item,
  }

  componentDidMount() {
    setTimeout(()=>{
      const { setFieldsValue } = this.props.form;
      // console.log(this.props, this.props.smsConfig.item)
      setFieldsValue(this.props.smsConfig.item);
    }, 1000) //只执行一次，延时1秒执行

  }

  render() {

    const {validateFieldsAndScroll, getFieldDecorator} = this.props.form;

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

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          this.props.dispatch({ type: 'smsConfig/save', payload: values });
        }
      });
    }

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 短信配置管理</h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal" loading={this.props.loading.effects['smsConfig/config']}>
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              <FormItem {...formItemLayout} label="URL">
                {getFieldDecorator('url', {rules: [{required: true, message: 'URL不能为空'}]})(<Input placeholder="输入短信接口URL"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="身份认证Token">
                {getFieldDecorator('token', {rules: [{required: true, message: '身份认证Token不能为空'}]})(<Input placeholder="输入身份认证Token"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="添加模板CODE">
                {getFieldDecorator('addModule', {rules: [{required: true, message: '添加模板CODE不能为空'}]})(<Input placeholder="输入添加模板CODE"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="删除模板CODE">
                {getFieldDecorator('delModule', {rules: [{required: true, message: '删除模板CODE不能为空'}]})(<Input placeholder="输入删除模板CODE"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="列表模板CODE">
                {getFieldDecorator('listModule', {rules: [{required: true, message: '列表模板CODE不能为空'}]})(<Input placeholder="输入列表模板CODE"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="查询短信余额CODE">
                {getFieldDecorator('surplus', {rules: [{required: true, message: '查询短信余额CODE不能为空'}]})(<Input placeholder="输入查询短信余额CODE"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="发送短信CODE">
                {getFieldDecorator('sendMsg', {rules: [{required: true, message: '发送短信CODE不能为空'}]})(<Input placeholder="输入发送短信CODE"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="发送短信的接口ID">
                {getFieldDecorator('sendCodeIId', {rules: [{required: true, message: '发送短信的接口ID不能为空'}]})(<Input placeholder="输入发送短信的接口ID"/>)}
              </FormItem>

              <FormItem className={styles.submitOper}>
                <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check">提交保存</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(({ smsConfig, loading }) => ({ smsConfig, loading }))(SmsConfig);
