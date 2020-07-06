import React from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { formItemLayout_large } from '@/utils/common';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class ExpressModal extends React.Component {

  state = {
    proId: 0,
  };

  componentDidMount() {
  }

  render() {
    const {
      onOk,
      orders,
      companyList,
      expressList,
      ordersProduct,
      form: {
        getFieldDecorator,
        setFieldsValue,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

    // const lenth

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        //console.log(values)
        if(!errors) {
          values.ordersNo = orders.ordersNo;
          values.addressCon = orders.addressCon;
          values.proId = ordersProduct.id;
          onOk(values);
        }
      });
    };

    const modalOpts = {
      ...modalProps,
      title: "发货【"+ordersProduct.proTitle+"】",
      onOk: handleOk
    };

    const changeCompany = (value, e) => {
      ///console.log("----------")
      setFieldsValue({expName: e.props.children});
      //console.log(value, e)
    };

    return(
      <Modal {...modalOpts} style={{"min-width":'80%', "top": 20}}>

        {/*<Tabs defaultActiveKey="0" onChange={onChangeTab}>
          {tabsCon}
          <TabPane tab={"2222"} key={0}>
            ----------
          </TabPane>
        </Tabs>*/}

        <Form layout="horizontal">
          <FormItem {...formItemLayout_large} label="物流公司">
            {getFieldDecorator('expName', {rules: [{required: true, message: '请选择物流公司'}]})(<Input type="hidden" placeholder="物流公司名称"/>)}
            {getFieldDecorator('expId')(
              <Select onChange={changeCompany}>
                {companyList.map((item)=>{
                  return <Option key={item.id} value={item.id}>{item.name}</Option>
                })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout_large} label="物流单号">
            {getFieldDecorator('expNo', {rules: [{required: true, message: '物流单号不能为空'}]})(<Input placeholder={"输入物流单号，共【"+ordersProduct.amount+"】件，多个单号用逗号隔开"}/>)}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

export default ExpressModal;
