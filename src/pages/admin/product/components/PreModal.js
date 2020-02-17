import React from 'react';
import { Form, Input, Modal, DatePicker } from 'antd';
import { formItemLayout } from '@/utils/common';
import moment from 'moment';

const FormItem = Form.Item;

@Form.create()
class PreModal extends React.Component {

  render() {

    const {
      onOk,
      form: {
        getFieldDecorator,
        setFieldsValue,
        validateFieldsAndScroll,
      },
      item,
      ...modalProps
    } = this.props;

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          values.proId=item.id;
          values.proTitle=item.title;
          onOk(values);
        }
      });
    };

    function disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const onDateChange = (date, dateString) => {
      // console.log(date, dateString);
      setFieldsValue({deliveryDate: dateString});
    };

    return(
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="预计发货时间">
            {getFieldDecorator('deliveryDate', {rules: [{required: true, message: '请选择预计发货时间'}]})(<Input type="hidden" placeholder="预计发货日期"/>)}
            <DatePicker
              format="YYYY-MM-DD"
              onChange={onDateChange}
              disabledDate={disabledDate}
            />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default PreModal;

