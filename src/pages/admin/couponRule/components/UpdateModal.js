import React from 'react';
import { Form, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

  state = {
    fetching: false,
    keyword: '',
    couponList: []
  };

  componentDidMount() {
    const item = this.props.item;
    const {setFieldsValue} = this.props.form;
    setFieldsValue(item);
  }
  render() {

    const {item, form} = this.props;
    const { getFieldDecorator, validateFieldsAndScroll} = form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    /*const {fetching, couponList} = this.state;

    const fetchProduct = (e) => {
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
    };*/

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator('couponId')(<Input type="hidden" placeholder="输入标签名称"/>)}
          {getFieldDecorator('couponName')(<Input type="hidden" placeholder="输入标签名称"/>)}
          <FormItem {...formItemLayout} label="规则名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '规则名称不能为空'}]})(<Input placeholder="输入规则名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="规则SN">
            <b className="red">{item.ruleSn}</b>
          </FormItem>
          {/*<FormItem {...formItemLayout} label="关联优惠券">
            {getFieldDecorator("pro")(
              <div>
                <p>{item.couponId?item.couponName:"未关联"}</p>
              <Select
                showSearch
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
              </div>
            )}
          </FormItem>*/}
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
