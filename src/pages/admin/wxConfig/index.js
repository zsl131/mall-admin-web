import React from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Icon, Input } from 'antd';

import styles from './index.css';

const FormItem = Form.Item;

@Form.create()
class WxConfig extends React.Component {

  componentDidMount() {
    setTimeout(()=>{
      const { setFieldsValue } = this.props.form;
      // console.log(this.props, this.props.wxConfig.item)
      setFieldsValue(this.props.wxConfig.item);
    }, 300) //只执行一次，延时1秒执行

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
          this.props.dispatch({ type: 'wxConfig/save', payload: values });
        }
      });
    };

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 微信配置管理</h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal">
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              <FormItem {...formItemLayout} label="APPID">
                {getFieldDecorator('appid', {rules: [{required: true, message: 'appid不能为空'}]})(<Input placeholder="输入appid"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="SECRET">
                {getFieldDecorator('secret', {rules: [{required: true, message: 'secret不能为空'}]})(<Input placeholder="输入secret"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="AESKEY">
                {getFieldDecorator('aesKey', {rules: [{required: true, message: 'AESKEY不能为空'}]})(<Input placeholder="输入AESKEY"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="url">
                {getFieldDecorator('url', {rules: [{required: true, message: 'url不能为空'}]})(<Input placeholder="输入url"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="token">
                {getFieldDecorator('token', {rules: [{required: true, message: 'token不能为空'}]})(<Input placeholder="输入token"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="eventTemp">
                {getFieldDecorator('eventTemp', {rules: [{required: true, message: 'eventTemp不能为空'}]})(<Input placeholder="输入eventTemp"/>)}
              </FormItem>

              <FormItem className={styles.submitOper}>
                <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check" loading={this.props.loading.effects['wxConfig/save']}>提交保存</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(({ wxConfig, loading }) => ({ wxConfig, loading }))(WxConfig);
