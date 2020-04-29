import React from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Icon, Input, InputNumber, Select, Tooltip } from 'antd';

import styles from './index.css';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class RewardRule extends React.Component {

  componentDidMount() {
    setTimeout(()=>{
      const { setFieldsValue } = this.props.form;
      // console.log(this.props, this.props.rewardRule.item)
      setFieldsValue(this.props.rewardRule.item);
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
          this.props.dispatch({ type: 'rewardRule/save', payload: values });
        }
      });
    };

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 提成奖励金管理<span className='dark'>&nbsp;&nbsp;在代理提成基础上额外的奖励</span></h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal">
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              <Tooltip title="起始金额，达到这个起始金额才有奖励金">
              <FormItem {...formItemLayout} label="起始金额">
                {getFieldDecorator('startMoney', {rules: [{required: true, message: '起始金额不能为空'}]})(<InputNumber style={{"width":"150px"}} placeholder="输入起始金额"/>)}
              </FormItem>
              </Tooltip>

              <Tooltip title="奖励比例，即奖励金占提成总额的比重">
              <FormItem {...formItemLayout} label="奖励比例">
                {getFieldDecorator('rewardRate', {rules: [{required: true, message: '奖励比例不能为空'}]})(<InputNumber style={{"width":"150px"}} placeholder="输入奖励比例"/>)}
              </FormItem>
              </Tooltip>

              <Tooltip title="每月占比，即每月领取总奖励金的比重">
              <FormItem {...formItemLayout} label="每月占比">
                {getFieldDecorator('monthRate', {rules: [{required: true, message: '每月占比不能为空'}]})(<InputNumber style={{"width":"150px"}} placeholder="输入每月占比"/>)}
              </FormItem>
              </Tooltip>

              <Tooltip title="每月占比，即每月领取总奖励金的比重">
                <FormItem {...formItemLayout} label="启用">
                  {getFieldDecorator('status', {rules: [{required: true, message: '请选择是否启用'}]})(
                    <Select style={{width: 150}} placeholder="请选择是否启用">
                      <Option value="0">停用</Option>
                      <Option value="1">启用</Option>
                    </Select>
                  )}
                </FormItem>
              </Tooltip>

              <FormItem className={styles.submitOper}>
                <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check" loading={this.props.loading.effects['rewardRule/save']}>提交保存</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(({ rewardRule, loading }) => ({ rewardRule, loading }))(RewardRule);
