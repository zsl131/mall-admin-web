import React from 'react';
import { Form, Icon, Input, InputNumber, Modal, Radio, Switch } from 'antd';
import { formItemLayout_large } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

  state = {
    openMode: ''
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
        values.status = values.status?"1":"0";
        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    const onRadioChange = (e) => {
      const val = e.target.value;
      this.setState({openMode: val});
    };

    const openMode = this.state.openMode;

    return(
      <Modal {...this.props} onOk={handleOk} style={{"minWidth":"80%", "top":"20px"}}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout_large} label="简要标题">
            {getFieldDecorator('title', {rules: [{required: true, message: '简要标题不能为空'}]})(<Input placeholder="输入简要标题"/>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<InputNumber placeholder="排序序号"/>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="显示状态">
            {getFieldDecorator("status")(<Switch defaultChecked={item.status==="1"} checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="close" />}/>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="打开方式">
            {getFieldDecorator("openMode", {rules: [{required: true, message: '打开方式不能为空'}]})(
              <Radio.Group onChange={onRadioChange}>
                <Radio value="0">不打开</Radio>
                <Radio value="1">弹窗方式打开</Radio>
                <Radio value="2">链接跳转</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formItemLayout_large} label="内容">
            {getFieldDecorator('content')(<Input disabled={(openMode==="0"||openMode==='')}  placeholder="内容部份，可以是链接地址、弹窗内容或不填"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
