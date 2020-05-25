import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

const { TextArea } = Input;

@Form.create()
class ReplyModal extends React.Component {

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;
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
         this.props.onOk(values);
        }
      });
    }

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="留言者">
            <span>{this.props.item.nickname}（{this.props.item.createTime}）</span>
          </FormItem>
          <FormItem {...formItemLayout} label="留言内容">
            {this.props.item.content}
          </FormItem>
          <FormItem {...formItemLayout} label="回复内容">
            {getFieldDecorator("reply", {rules:[{required: true, message: '请输入回复信息'}]})(<TextArea rows={4} placeholder="输入回复内容"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default ReplyModal;
