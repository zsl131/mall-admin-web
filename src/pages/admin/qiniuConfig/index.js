import React from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Icon, Input } from 'antd';

import styles from './index.css';

const FormItem = Form.Item;

@Form.create()
class QiniuConfig extends React.Component {

  state = {
    // item: this.props.qiniuConfig.item,
  }

  componentDidMount() {
    setTimeout(()=>{
      const { setFieldsValue } = this.props.form;
      // console.log(this.props, this.props.qiniuConfig.item)
      setFieldsValue(this.props.qiniuConfig.item);
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
          this.props.dispatch({ type: 'qiniuConfig/save', payload: values });
        }
      });
    };

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 七牛配置管理</h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal">
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              <FormItem {...formItemLayout} label="URL">
                {getFieldDecorator('url', {rules: [{required: true, message: 'URL不能为空'}]})(<Input placeholder="输入URL（存储的外链地址）"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="accessKey">
                {getFieldDecorator('accessKey', {rules: [{required: true, message: 'accessKey不能为空'}]})(<Input placeholder="输入accessKey"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="secretKey">
                {getFieldDecorator('secretKey', {rules: [{required: true, message: 'secretKey不能为空'}]})(<Input placeholder="输入secretKey"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="仓库名称">
                {getFieldDecorator('bucketName', {rules: [{required: true, message: '仓库名称不能为空'}]})(<Input placeholder="输入仓库名称"/>)}
              </FormItem>

              <FormItem className={styles.submitOper}>
                <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check" loading={this.props.loading.effects['qiniuConfig/save']}>提交保存</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(({ qiniuConfig, loading }) => ({ qiniuConfig, loading }))(QiniuConfig);
