import React from 'react';
import { Col, Form, Input, Modal, Row, Tooltip } from 'antd';
import { formItemLayout, formItemLayout_large, uuid } from '@/utils/common';
import BraEditor from '@/components/common/BraEditor';

const FormItem = Form.Item;

@Form.create()
class AddModal extends React.Component {

  state = {
    uuid: uuid()
  };

  render() {

    const {
      onOk,
      selectCate,
      form: {
        getFieldDecorator,
        setFieldsValue,
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

    const handleChangeContent = (obj) => {
      //console.log("add===", obj);
      setFieldsValue({"content": obj.content, rawContent: obj.raw});
    };

    return(
      <Modal {...modalOpts} style={{"minWidth":"90%", "top":"10px"}}>
        <Form layout="horizontal">
          <Row>
            <Col span={14}>
              <FormItem {...formItemLayout} label="文章标题">
                {getFieldDecorator('title', {rules: [{required: true, message: '产品标题不能为空'}]})(<Input placeholder="输入产品标题"/>)}
              </FormItem>
            </Col>
            <Col span={10}>
              <Tooltip title="SN，前端通过SN来获取文章信息">
                <FormItem {...formItemLayout} label="SN">
                  {getFieldDecorator('sn', {rules: [{required: true, message: 'SN不能为空'}]})(<Input placeholder="输入SN"/>)}
                </FormItem>
              </Tooltip>
            </Col>
          </Row>

          <FormItem {...formItemLayout_large} label="文章内容">
            {getFieldDecorator('rawContent')(<Input type="hidden" placeholder=""/>)}
            {getFieldDecorator("content", {rules: [{required: true, message: '文章内容不能为空'}]})(
              <BraEditor onChangeContent={handleChangeContent}/>
              )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;

