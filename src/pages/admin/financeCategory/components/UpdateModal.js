import React from 'react';
import { Form, Input, Modal, Radio } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
class UpdateModal extends React.Component {

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         this.props.onOk(values);
        }
      });
    }

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}

          <FormItem {...formItemLayout} label="分类类别">
            {getFieldDecorator('flag', {rules: [{required: true, message: '请选择类别'}]})(
              <RadioGroup>
                <Radio value="1">进账</Radio>
                <Radio value="-1">出账</Radio>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="分类名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '分类名称不能为空'}]})(<Input placeholder="输入分类名称"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default UpdateModal;
