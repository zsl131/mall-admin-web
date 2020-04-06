import React from 'react';
import { Form, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

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

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="模板ID">
            {getFieldDecorator('tempId', {rules: [{required: true, message: '模板ID不能为空'}]})(<Input placeholder="输入模板ID"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="模板名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '模板名称不能为空'}]})(<Input placeholder="输入模板名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="模板SN">
            <span className="red">{item.sn}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="模板内容">
            {getFieldDecorator('content', {rules: [{required: true, message: '模板内容不能为空'}]})(<Input placeholder="如：thing1_phrase2_date3_thing4_name5"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('remark')(<Input placeholder="如：审核项目_审核状态_申请时间_备注信息_申请人"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
