import React from 'react';
import {Form, Icon, Input, Modal} from 'antd';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

  UNSAFE_componentWillMount() {
    this.setState({
      item: this.props.item,
      curIcon: this.props.item.icon
    })
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    // console.log("didMount", this.props.item);
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

    const handleChange = (e) => {
      this.setState({ curIcon: e.target.value });
    }

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '菜单名称不能为空'}]})(<Input placeholder="输入菜单名称" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '输入正整数序号'}]})(<Input placeholder="输入正整数序号" type="number" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="连接">
            {getFieldDecorator('href')(<Input placeholder="链接地址，不能输入#" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="图标">
            {getFieldDecorator('icon')(<Input placeholder="图标，在ant.design中查找" onChange={handleChange} addonAfter={<Icon type={this.state.curIcon}/>}/>)}

          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
