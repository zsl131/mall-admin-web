import React from 'react';
import moment from 'moment';
import {Col, DatePicker, Form, Input, InputNumber, Modal, Radio, Row, Select, Spin, Tooltip} from 'antd';
import request from "../../../../utils/request";
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

@Form.create()
class AddModal extends React.Component {

  state = {
    cateList:[],
    fetching: false,
  };

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  fetchCate = ()=> {
    if(this.state.cateList<=0) {
      request("financeCategoryService.listNoPage", {}, true).then((response) => {
        let data = [];
        data.push( ...response.list.map((item) => ({
          value: ""+item.id,
          text: item.name,
        })));

        this.setState({cateList: data, fetching: false});
      });
    }
  };

  validMoney=(rule, value, callback) => {
    if(value<=0) {
      callback("请输入大于0的金额");
    } else {callback()}
  };

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

    const disabledDate=(current) => {
      // Can not select days before today and today
      return current && current > moment().endOf('day');
    };

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          onOk(values);
        }
      });
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    return(
      <Modal {...modalOpts} style={{ "minWidth": '50%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="账目分类">
            {getFieldDecorator("cateId", {rules: [{required: true, message: '请选择账目分类'}]})(
              <Select
                placeholder="选择分类"
                notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                onFocus={this.fetchCate}
                style={{ width: '120px' }}
              >
                {this.state.cateList.map(d => <Option key={d.value}>{d.text}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="账目摘要">
            {getFieldDecorator('title', {rules: [{required: true, message: '账目摘要不能为空'}]})(<Input placeholder="输入账目摘要"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="金额">
            <Row>
              <Tooltip placement="topLeft" title="选择类别" arrowPointAtLeft>
                <Col span={12}>
                  <FormItem >
                    {getFieldDecorator('flag', {rules: [{required: true, message: '请选择类别'}]})(
                      <RadioGroup>
                        <Radio value="1">进账</Radio>
                        <Radio value="-1">出账</Radio>
                      </RadioGroup>
                    )}
                  </FormItem>
                </Col>
              </Tooltip>
              <Tooltip placement="topLeft" title="输入正数金额" arrowPointAtLeft>
                <Col span={12}>
                  <FormItem >
                    {getFieldDecorator('amount', {rules: [{required: true, message: '金额不能为空'},{validator:this.validMoney}]})(<InputNumber placeholder="正数金额"/>)}
                  </FormItem>
                </Col>
              </Tooltip>
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="报账日期">
            <Row>
              <Tooltip placement="topLeft" title="报账日期" arrowPointAtLeft>
                <Col span={12}>
                  <FormItem >
                    {getFieldDecorator('recordDate', {rules: [{required: true, message: '报账不能为空'}]})(<DatePicker disabledDate={disabledDate} placeholder="请选择报账日期" />)}
                  </FormItem>
                </Col>
              </Tooltip>
              <Tooltip placement="topLeft" title="单据编号" arrowPointAtLeft>
                <Col span={12}>
                  <FormItem >
                    {getFieldDecorator('ticketNo')(<Input placeholder="输入单据编号" type="hidden"/>)}
                  </FormItem>
                </Col>
              </Tooltip>
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="经办人">
            <Row>
              <Tooltip placement="topLeft" title="经办人" arrowPointAtLeft>
                <Col span={7}>
                  <FormItem >
                    {getFieldDecorator('operator', {rules: [{required: true, message: '经办人不能为空'}]})(<Input placeholder="输入经办人" />)}
                  </FormItem>
                </Col>
              </Tooltip>
              <Tooltip placement="topLeft" title="备注" arrowPointAtLeft>
                <Col span={17}>
                  <FormItem >
                    {getFieldDecorator('remark')(<Input placeholder="输入备注信息"/>)}
                  </FormItem>
                </Col>
              </Tooltip>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;
