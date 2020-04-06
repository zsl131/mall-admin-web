import React from 'react';
import { Form, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class AddModal extends React.Component {

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
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

    return(
      <Modal {...modalOpts} >
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="模板ID">
            {getFieldDecorator('tempId', {rules: [{required: true, message: '模板ID不能为空'}]})(<Input placeholder="输入模板ID"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="模板名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '模板名称不能为空'}]})(<Input placeholder="输入模板名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="模板SN">
            {getFieldDecorator('sn', {rules: [{required: true, message: '模板SN不能为空'}]})(<Input placeholder="输入模板SN"/>)}
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

export default AddModal;

