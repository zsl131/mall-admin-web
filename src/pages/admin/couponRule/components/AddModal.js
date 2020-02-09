import React from 'react';
import { Form, Input, Modal, Select, Spin } from 'antd';
import { formItemLayout } from '@/utils/common';
import { httpGet } from '@/utils/normalService';

const FormItem = Form.Item;
const {Option} = Select;

@Form.create()
class AddModal extends React.Component {

  state = {
    fetching: false,
    keyword: '',
    couponList: []
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
        if(!errors) {
          onOk(values);
        }
      });
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const {fetching, keyword, couponList} = this.state;

    const fetchProduct = (e) => {
      console.log(e);
      if(!this.state.fetching) {
        this.setState({fetching: true, couponList: []});
        let api = {apiCode: "couponService.searchByName", name: e};
        httpGet(api).then((res)=> {
          this.setState({fetching: false, couponList: res.couponList});
        })
      }
    };

    const handleProductChange = (e) => {
      //console.log(e);
      setFieldsValue({couponId: e.key, couponName: e.label});
    };

    return(
      <Modal {...modalOpts} >
        <Form layout="horizontal">
          {getFieldDecorator('couponId')(<Input type="hidden" placeholder="输入标签名称"/>)}
          {getFieldDecorator('couponName')(<Input type="hidden" placeholder="输入标签名称"/>)}
          <FormItem {...formItemLayout} label="规则名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '规则名称不能为空'}]})(<Input placeholder="输入规则名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="规则SN">
            {getFieldDecorator('ruleSn', {rules: [{required: true, message: '规则SN不能为空'}]})(<Input placeholder="输入规则SN"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="关联优惠券">
            {getFieldDecorator("pro")(
              <Select
                showSearch
                value={keyword}
                placeholder="输入优惠券名称查找"
                defaultActiveFirstOption={false}
                showArrow={false}
                labelInValue={true}
                filterOption={false}
                onSearch={fetchProduct}
                onChange={handleProductChange}
                style={{ width: '100%' }}
                notFoundContent={fetching ? <Spin size="small" /> : null}
              >
                {couponList.map(d => (
                  <Option key={d.id}>{d.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;

