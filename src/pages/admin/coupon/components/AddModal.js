import React from 'react';
import { Col, Form, Icon, Input, InputNumber, Modal, Row, Select, Spin, Switch, Tooltip } from 'antd';
import { formItemLayout, formItemLayout_large, rebuildTime } from '@/utils/common';
import { httpGet } from '@/utils/normalService';

const FormItem = Form.Item;
const {Option} = Select;

@Form.create()
class AddModal extends React.Component {

  state = {
    fetching: false,
    keyword: '',
    proList: [],
    durationStr: '',
  };

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        setFieldsValue
      },
      ...modalProps
    } = this.props;

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        values.status = values.status?"1":"0";
        values.canRepeat = values.canRepeat?"1":"0";
        if(!errors) {
          onOk(values);
        }
      });
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const {fetching, keyword, proList,durationStr} = this.state;

    const fetchProduct = (e) => {
      if(!this.state.fetching) {
        this.setState({fetching: true, proList: []});
        let api = {apiCode: "productService.searchByTitle", title: e};
        httpGet(api).then((res)=> {
          console.log(res);
          this.setState({fetching: false, proList: res.proList});
        })
      }
    };

    const handleProductChange = (e) => {
      //console.log(e);
      setFieldsValue({proId: e.key, proTitle: e.label});
    };

    const onDurationChange = (e)=> {
      const res = rebuildTime(e);
      this.setState({durationStr: res});
      // console.log(e, res);
    };

    return(
      <Modal {...modalOpts} style={{"min-width":"80%","top":"20px"}}>
        <Form layout="horizontal">
          {getFieldDecorator('proId')(<Input type="hidden" placeholder="输入标签名称"/>)}
          {getFieldDecorator('proTitle')(<Input type="hidden" placeholder="输入标签名称"/>)}
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="名称">
                {getFieldDecorator('name', {rules: [{required: true, message: '优惠券名称不能为空'}]})(<Input placeholder="输入优惠券名称"/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <Tooltip title="发行数量">
                <FormItem {...formItemLayout} label="发行数量">
                  {getFieldDecorator("surplusCount", {rules: [{required: true, message: '发行数量不能小于0'}]})(<InputNumber style={{"width":"100%"}} placeholder="数量"/>)}
                </FormItem>
              </Tooltip>
            </Col>
          </Row>

          <FormItem {...formItemLayout_large} label="说明">
            {getFieldDecorator('remark', {rules: [{required: true, message: '说明不能为空'}]})(<Input placeholder="输入优惠券说明"/>)}
          </FormItem>
          <Row>
            <Col span={12}>
              <Tooltip title="该优惠券可抵金额，单位元">
              <FormItem {...formItemLayout} label="价值">
                {getFieldDecorator('worth', {rules: [{required: true, message: '价值不能空，单位元'}]})(<InputNumber placeholder="价值，元"/>)}
              </FormItem>
              </Tooltip>
            </Col>
            <Col span={12}>
              <Tooltip title="消费满多少金额，可使用此优惠券，单位元">
              <FormItem {...formItemLayout} label="满减">
                {getFieldDecorator('reachMoney', {rules: [{required: true, message: '满减金额不能为空，单位元'}]})(<InputNumber placeholder="满减，元"/>)}
              </FormItem>
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="关联产品">
                {getFieldDecorator("pro")(
                  <Select
                    showSearch
                    value={keyword}
                    placeholder="输入产品标题查找"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    labelInValue={true}
                    filterOption={false}
                    onSearch={fetchProduct}
                    onChange={handleProductChange}
                    style={{ width: '100%' }}
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                  >
                    {proList.map(d => (
                      <Option key={d.id}>{d.title}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>

            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Tooltip title="设置有效时长，单位秒，从获取时开始计时">
                <FormItem {...formItemLayout} label="有效时长">
                  {getFieldDecorator("duration", {rules: [{required: true, message: '有效时长不能为空'}]})(<InputNumber style={{"width":"100%"}} onChange={onDurationChange} placeholder="时长，秒"/>)}
                </FormItem>
              </Tooltip>
            </Col>
            <Col span={12}>
              <span style={{"lineHeight":"40px"}}>{durationStr}</span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Tooltip title="是否显示，只有显示才能被用户获取">
                <FormItem {...formItemLayout} label="显示状态">
                  {getFieldDecorator("status")(<Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="close" />}/>)}
                </FormItem>
              </Tooltip>
            </Col>
            <Col span={12}>
              <Tooltip title="是否可叠加使用">
                <FormItem {...formItemLayout} label="叠加使用">
                  {getFieldDecorator("canRepeat")(<Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="close" />}/>)}
                </FormItem>
              </Tooltip>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;

