import React from 'react';
import { Form, Input, Modal, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class ExpressModal extends React.Component {

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    const {express} = this.props;
    if(express) {
      setFieldsValue(express);
    }
  }

  render() {
    const {
      onOk,
      orders,
      companyList,
      express,
      form: {
        getFieldDecorator,
        setFieldsValue,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

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
        //console.log(values)
        if(!errors) {
          values.ordersNo = orders.ordersNo;
          values.addressCon = orders.addressCon;
          onOk(values);
        }
      });
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const changeCompany = (value, e) => {
      setFieldsValue({expName: e.props.children});
      //console.log(value, e)
    };

    return(
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="物流公司">
            {getFieldDecorator('expName', {rules: [{required: true, message: '请选择物流公司'}]})(<Input type="hidden" placeholder="物流公司名称"/>)}
            {getFieldDecorator('expId')(
              <Select onChange={changeCompany}>
                {companyList.map((item)=>{
                  return <Option key={item.id} value={item.id}>{item.name}</Option>
                })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="物流单号">
            {getFieldDecorator('expNo', {rules: [{required: true, message: '物流单号不能为空'}]})(<Input placeholder="输入物流单号"/>)}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

export default ExpressModal;
