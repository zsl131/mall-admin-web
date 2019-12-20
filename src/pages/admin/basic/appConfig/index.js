import React from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Icon, Input } from 'antd';

import styles from './index.css';

const FormItem = Form.Item;

@Form.create()
class AppConfig extends React.Component {

  state = {
    // item: this.props.appConfig.item,
  }

  componentDidMount() {
    setTimeout(()=>{
      const { setFieldsValue } = this.props.form;
      // console.log(this.props, this.props.appConfig.item)
      setFieldsValue(this.props.appConfig.item);
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
          this.props.dispatch({ type: 'appConfig/save', payload: values });
        }
      });
    };

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 系统基础配置管理</h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal">
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              <FormItem {...formItemLayout} label="系统名称">
                {getFieldDecorator('appName', {rules: [{required: true, message: '系统名称不能为空'}]})(<Input placeholder="输入系统名称"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="联系人">
                {getFieldDecorator('contact')(<Input placeholder="输入联系人"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="联系电话">
                {getFieldDecorator('phone')(<Input placeholder="输入联系电话"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="联系地址">
                {getFieldDecorator('address')(<Input placeholder="输入联系地址"/>)}
              </FormItem>

              <FormItem className={styles.submitOper}>
                <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check" loading={this.props.loading.effects['appConfig/save']}>提交保存</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(({ appConfig, loading }) => ({ appConfig, loading }))(AppConfig);
