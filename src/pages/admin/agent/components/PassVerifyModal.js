import React from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { formItemLayout } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class PassVerifyModal extends React.Component {

  state = {
    oldLevel: this.props.item.levelId,
    curLevel: this.props.item.levelId,
  };

  render() {
    const {
      onOk,
      levelList,
      form: {
        getFieldDecorator,
        setFieldsValue,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

    const {curLevel, oldLevel} = this.state;

    const setLevel = (level)=> {
      this.setState({curLevel: level});
      setFieldsValue({level:level});
    };

    const levels = () => {
      return levelList.map((item)=> {
        return <span key={item.id}><Button type={item.id===curLevel?"primary":"default"} onClick={()=>setLevel(item.id)}>{item.level}-{item.name}</Button>&nbsp;&nbsp;</span>
      });
    };

    const handleOk = (e) => {
      e.preventDefault();

      if(curLevel===oldLevel) {
        message.error("请先选择代理等级");
      } else {
        validateFieldsAndScroll((errors, values) => {
          if(!errors) {
            values.reason = "通过申请";
            onOk(values);
          }
        });
      }
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    return(
      <Modal {...modalOpts} >
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="代理等级">
            {getFieldDecorator('level', {rules: [{required: true, message: '请选择代理等级'}]})(<Input type="hidden"/>)}
            {levels()}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default PassVerifyModal;

