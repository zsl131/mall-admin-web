import React from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Icon, Input } from 'antd';

import styles from './index.css';

const FormItem = Form.Item;

@Form.create()
class MiniConfig extends React.Component {

  componentDidMount() {
    setTimeout(()=>{
      const { setFieldsValue } = this.props.form;
      // console.log(this.props, this.props.miniConfig.item)
      setFieldsValue(this.props.miniConfig.item);
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
          this.props.dispatch({ type: 'miniConfig/save', payload: values });
        }
      });
    };

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 小程序配置管理</h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal">
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              <FormItem {...formItemLayout} label="APPID">
                {getFieldDecorator('appid', {rules: [{required: true, message: 'appid不能为空'}]})(<Input placeholder="输入appid"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="商户ID">
                {getFieldDecorator('mchid', {rules: [{required: true, message: '商户ID不能为空'}]})(<Input placeholder="输入商户ID，商户"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="API密钥">
                {getFieldDecorator('apiKey', {rules: [{required: true, message: 'API密钥不能为空'}]})(<Input placeholder="输入API密钥，商户"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="AppSecret">
                {getFieldDecorator('appSecret', {rules: [{required: true, message: 'AppSecret不能为空'}]})(<Input placeholder="输入AppSecret"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="消息AesKey">
                {getFieldDecorator('msgAesKey')(<Input placeholder="输入消息AesKey"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="消息Token">
                {getFieldDecorator('msgToken')(<Input placeholder="输入消息Token"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="消息URL">
                {getFieldDecorator('msgUrl')(<Input placeholder="输入消息URL"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="DownloadUrl">
                {getFieldDecorator('downloadUrl')(<Input placeholder="输入DownloadUrl"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="RequestUrl">
                {getFieldDecorator('requestUrl')(<Input placeholder="输入RequestUrl"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="UploadUrl">
                {getFieldDecorator('uploadUrl')(<Input placeholder="输入UploadUrl"/>)}
              </FormItem>

              <FormItem className={styles.submitOper}>
                <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check" loading={this.props.loading.effects['miniConfig/save']}>提交保存</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(({ miniConfig, loading }) => ({ miniConfig, loading }))(MiniConfig);
