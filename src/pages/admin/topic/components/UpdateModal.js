import React from 'react';
import { Col, Form, Input, Modal, Row, Tooltip } from 'antd';
import { formItemLayout, formItemLayout_large } from '@/utils/common';
import BraEditor from '@/components/common/BraEditor';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

  componentDidMount() {
    const item = this.props.item;
    const {setFieldsValue} = this.props.form;
    setFieldsValue(item);
  }
  render() {

    const {
      item,
      onOk,
      form: {
        getFieldDecorator,
        setFieldsValue,
        validateFieldsAndScroll,
      },
    } = this.props;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         onOk(values);
        }
      });
    };

    const handleChangeContent = (obj) => {
      // console.log("add===", html);
      //setFieldsValue({"content": html});
      setFieldsValue({"content": obj.content, rawContent: obj.raw});
    };

    return(
      <Modal {...this.props} onOk={handleOk}  style={{"minWidth":"90%", "top":"10px"}}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <Row>
            <Col span={14}>
              <FormItem {...formItemLayout} label="文章标题">
                {getFieldDecorator('title', {rules: [{required: true, message: '产品标题不能为空'}]})(<Input placeholder="输入产品标题"/>)}
              </FormItem>
            </Col>
            <Col span={10}>
              <Tooltip title="SN，前端通过SN来获取文章信息">
                <FormItem {...formItemLayout} label="SN">
                  <span className="red">{item.sn}</span>
                </FormItem>
              </Tooltip>
            </Col>
          </Row>

          <FormItem {...formItemLayout_large} label="文章内容">
            {getFieldDecorator('rawContent')(<Input type="hidden" placeholder=""/>)}
            {getFieldDecorator("content", {rules: [{required: true, message: '文章内容不能为空'}]})(
              <BraEditor content={item.rawContent} onChangeContent={handleChangeContent}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
