import React from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Icon, Input } from 'antd';

import styles from './index.css';

const FormItem = Form.Item;

@Form.create()
class ExpressConfig extends React.Component {

  componentDidMount() {
    setTimeout(()=>{
      const { setFieldsValue } = this.props.form;
      // console.log(this.props, this.props.expressConfig.item)
      setFieldsValue(this.props.expressConfig.item);
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
          this.props.dispatch({ type: 'expressConfig/save', payload: values });
        }
      });
    };

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 物流配置管理</h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal">
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              <FormItem {...formItemLayout} label="名称">
                {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入接口名称"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="请求地址">
                {getFieldDecorator('url', {rules: [{required: true, message: '请求地址不能为空'}]})(<Input placeholder="输入请求地址"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="请求路径">
                {getFieldDecorator('path', {rules: [{required: true, message: '请求路径不能为空'}]})(<Input placeholder="输入请求路径"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="AppCode">
                {getFieldDecorator('appCode', {rules: [{required: true, message: 'AppCode不能为空'}]})(<Input placeholder="输入AppCode"/>)}
              </FormItem>

              <FormItem className={styles.submitOper}>
                <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check" loading={this.props.loading.effects['expressConfig/save']}>提交保存</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(({ expressConfig, loading }) => ({ expressConfig, loading }))(ExpressConfig);
