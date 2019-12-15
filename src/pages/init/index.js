import React from 'react';
import { connect } from 'dva';
import { Form, Button, Input, Icon, Card, Row, Col, Spin } from 'antd';
import styles from './index.css';

const FormItem = Form.Item;

const Init = ({
  loading,
  dispatch,
  init,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  }
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      console.log(errors, values);
      if(!errors) {
        dispatch({ type: 'init/initSystem', payload: values });
      }
    });
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24},
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 }
    }
  }

  return (
    <Spin tip="加载中..." className={styles.loading} size="large" spinning={init.spinVisible}>
      <Card className={styles.mainContainer} bordered={false}>
        <h2 className={styles.title}><Icon type="bulb"/> 系统初始化</h2>
        <Form onSubmit={handleSubmit}>
          <FormItem {...formItemLayout} label="系统名称">
            {getFieldDecorator("appName", {rules: [{required: true, message: '请输入系统名称'}]})(<Input placeholder="输入系统名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="管理员昵称">
            {getFieldDecorator("nickname", {rules: [{required: true, message: '请输入管理员昵称'}]})(<Input placeholder="输入管理员昵称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="登陆用户名">
            {getFieldDecorator("username", {rules: [{required: true, message: '请输入登陆用户名'}]})(<Input placeholder="输入用户名"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="登陆密码">
            {getFieldDecorator("password", {rules: [{required: true, message: '请输入登陆密码'}]})(<Input placeholder="输入初始登陆密码" type="password"/>)}
          </FormItem>
          {/*<FormItem {...formItemLayout} label="管理员邮箱">
            {getFieldDecorator("email", {rules: [{type: 'email', message: '请输入正确的邮箱地址'}]})(<Input placeholder="输入管理员邮箱"/>)}
          </FormItem>*/}
          <Row>
            <Col span={20} style={{"textAlign": "right"}} >
              <Button type="primary" loading={loading.effects["init/initSystem"]} htmlType="submit" icon="check" className={styles.submitBtn}>确认提交初始化</Button>
            </Col>
            <Col span={4}></Col>
          </Row>
        </Form>
      </Card>
    </Spin>
  );
}
export default connect(({ loading, init }) => ({ loading, init }))(Form.create()(Init));
