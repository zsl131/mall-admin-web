import React from 'react';
import { Col, Form, Icon, Input, InputNumber, Modal, Row, Switch, Tooltip } from 'antd';
import { formItemLayout } from '@/utils/common';
import MiniIcon from '@/components/common/MiniIcon';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

  state = {
    bgColor: '',
    icon: '',
    status: false,
  };

  componentDidMount() {
    const item = this.props.item;
    const {setFieldsValue} = this.props.form;
    setFieldsValue(item);
    this.setState({bgColor: item.bgColor, icon: item.icon, status: item.status==="1"});
  }
  render() {
    const {form} = this.props;
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

    const onColorChange = (e) => {
      this.setState({bgColor: e.target.value});
    };

    const onIconChange = (e) => {
      this.setState({icon: e.target.value});
    };

    return(
      <Modal {...this.props} onOk={handleOk} style={{"minWidth":"80%", "top":"20px"}}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="名称">
                {getFieldDecorator('txt', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入名称，建议4个字"/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="小字说明">
                {getFieldDecorator('smallTxt', {rules: [{required: true, message: '小字说明不能为空'}]})(<Input placeholder="输入小字说明，建议4个字"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="背景颜色">
                <Tooltip title="支持RGB和16进制">{getFieldDecorator('bgColor')(<Input addonAfter={<span style={{"color":this.state.bgColor}}>效果</span>} onChange={onColorChange} placeholder="背景颜色"/>)}</Tooltip>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="图标样式">
                <Tooltip title="在iconfont项目中查看">{getFieldDecorator('icon')(<Input addonAfter={<MiniIcon type={this.state.icon}/>} onChange={onIconChange} placeholder="图标样式"/>)}</Tooltip>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Tooltip title="链接地址">
                <FormItem {...formItemLayout} label="链接地址">
                  {getFieldDecorator('path', {rules: [{required: true, message: '链接地址不能为空'}]})(<Input placeholder="输入链接地址"/>)}
                </FormItem>
              </Tooltip>
            </Col>
            <Col span={12}>
              <Tooltip title="可选：navigate、redirect、switchTab、reLaunch、navigateBack、exit">
                <FormItem {...formItemLayout} label="链接模式">
                  {getFieldDecorator('navMode', {rules: [{required: true, message: '链接模式不能为空'}]})(<Input placeholder="链接模式，如：navigate"/>)}
                </FormItem>
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="序号">
                <Tooltip title="排序序号，越小排在越前面">{getFieldDecorator('orderNo')(<InputNumber placeholder="排序序号"/>)}</Tooltip>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="显示状态">
                {getFieldDecorator("status")(<Tooltip title="是否显示在小程序端"><Switch defaultChecked={this.state.status} checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="close" />}/></Tooltip>)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
