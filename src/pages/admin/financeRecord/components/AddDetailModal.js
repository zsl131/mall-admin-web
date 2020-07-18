import React from 'react';
import moment from 'moment';
import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Spin, Tooltip } from 'antd';
import request from '../../../../utils/request';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class AddDetailModal extends React.Component {

  state = {
    cateList:[],
    fetching: false,
    recordDate:'',
    hasSet: false, //是否已经设置
    curDetail: this.props.curDetail,
  };

  componentDidMount() {
    //const {setFieldsValue} = this.props.form;
    //console.log("-------------")

    //setFieldsValue(this.state.curDetail);
  }

  fetchCate = ()=> {
    if(this.state.cateList<=0) {
      request("financeCategoryService.listNoPage", {flag: this.props.flag}, true).then((response) => {
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
      callback("请输入大于0的数");
    } else {callback()}
  };

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        setFieldsValue,
        resetFields,
      },
      ...modalProps
    } = this.props;

    const curDetail = this.props.curDetail;

   // console.log(curDetail);

    if(curDetail && curDetail.randomId && !this.state.hasSet) {
      //console.log(curDetail);
      this.setState({hasSet: true});
      const date = curDetail.recordDate;
      delete curDetail.recordDate;
      setFieldsValue(curDetail);
      if(date) {
        setFieldsValue({recordDate: moment(date, "YYYY-MM-DD")})
      }
    }

    const disabledDate=(current) => {
      // Can not select days before today and today
      return current && current > moment().endOf('day');
    };

    const onChangeDate = (time, dateString) => {
      this.setState({recordDate: dateString});
    };

    const getCateName = (cateId)=> {
      let res = '';
      this.state.cateList.map((item)=>{if(item.value===cateId) {res = item.text}return item.value;});
      return res;
    };

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          values.recordDate = this.state.recordDate;
          values.amount = values.count* values.price;
          values.cateName = getCateName(values.cateId);
          if(!values.randomId) {
            values.randomId = Math.random().toString(36).substr(3,20);
          }
          //console.log(values)
          onOk(values);
          resetFields();
          this.setState({hasSet: false})
        }
      });
    };

    const modalOpts = {
      ...modalProps,
      title: '添加流水详情【'+(this.state.flag==='1'?"入账":"出账")+'】',
      onOk: handleOk,
    };

    return(
      <Modal {...modalOpts} style={{ "minWidth": '50%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator("randomId")(<Input type="hidden"/>)}
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
              <Tooltip placement="topLeft" title="输入单价" arrowPointAtLeft>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="单价">
                    {getFieldDecorator('price', {rules: [{required: true, message: '单价不能为空'},{validator:this.validMoney}]})(<InputNumber placeholder="正数单价"/>)}
                  </FormItem>
                </Col>
              </Tooltip>
              <Tooltip placement="topLeft" title="输入数量" arrowPointAtLeft>
                <Col span={12}>
                  <FormItem  {...formItemLayout} label="数量">
                    {getFieldDecorator('count', {rules: [{required: true, message: '数量不能为空'},{validator:this.validMoney}]})(<InputNumber placeholder="正数数量"/>)}
                  </FormItem>
                </Col>
              </Tooltip>
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="账目日期">
            {getFieldDecorator('recordDate', {rules: [{required: true, message: '账目不能为空'}]})(<DatePicker onChange={onChangeDate} disabledDate={disabledDate} placeholder="请选择账目日期" />)}
          </FormItem>
          {/*<FormItem {...formItemLayout} label="单据张数">
            {getFieldDecorator('ticketCount', {rules: [{required: true, message: '单据张数不能为空'},{validator:this.validMoney}]})(<InputNumber placeholder="正数数量"/>)}
          </FormItem>*/}
        </Form>
      </Modal>
    );
  }
}

export default AddDetailModal;
