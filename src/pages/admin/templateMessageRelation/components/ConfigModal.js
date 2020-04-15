import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

const ConfigModal = ({
  onOk,
  item,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  ...modalProps
}) => {

  const fields = item.rules.split("-");

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
      if(!errors) {
        let keyValues = "";
        Object.keys(values).map((k) => {
          if(k!=='templateId') {
            keyValues += k + "=" + values[k]+"-";
            delete values[k];
          }
          return k;
        });
        //console.log(keyValues);
        values.templateName = item.name; //设置模板名称
        values.keyValues = keyValues;
        onOk(values);
      }
    });
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  };

  const formItems = fields.map((obj, index) => (
    <FormItem {...formItemLayout} label={obj} key={index}>
      {getFieldDecorator(obj)(<Input type="text" placeholder={`对应键，在模板消息中查找，如：keyword${index+1}`}/>)}
    </FormItem>
  ));

  return(
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="模板ID">
          {getFieldDecorator('templateId', {rules: [{required: true, message: '请输入模板ID'}]})(<Input placeholder="模板ID，在微信平台查找"/>)}
        </FormItem>
        {formItems}
      </Form>
    </Modal>
  );
}

export default Form.create()(ConfigModal);
