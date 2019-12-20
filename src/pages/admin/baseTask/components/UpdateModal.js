import React from 'react';
import { DatePicker, Form, Input, InputNumber, message, Modal, Radio, Select } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

  state = {
    startTime: '',
    type: '',
  };
  onChangeType = (e) => {
    const type = e.target.value;
    this.setState({type: type});
  };

  onChangeTime = (value, dateString) => {
    //console.log(value, dateString);
    this.setState({startTime: dateString});
  };
  componentDidMount() {
    const item = this.props.item;
    this.setState({type: item.type, startTime: item.startTime});

    setTimeout(()=>{
      const {setFieldsValue} = this.props.form;
      setFieldsValue(item);
    }, 300) //只执行一次，延时1秒执行

  }
  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;

    const {type,startTime} = this.state;

    const disabledDate = (current) => {
      return current < moment().subtract(1, "days")
    };

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
      const that = this;
      validateFieldsAndScroll((errors, values) => {
        values.startTime = that.state.startTime;
        if(type==="2") {
          if(values.isWait!=="0" && values.isWait!=="1") {message.error("请选择执行规则"); return;}
          if(!values.period || values.period<=0) {message.error("请输入间隔时长，单位秒"); return}
        } else if(type==="3") {
          if(!values.cron) {message.error("请输入cron规则"); return;}
        }

        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    return(
      <Modal {...this.props} onOk={handleOk} style={{"minWidth":"80%", "top":"20px"}}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="描述">
            {getFieldDecorator('taskDesc', {rules: [{required: true, message: '描述不能为空'}]})(<Input placeholder="输入任务描述"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="beanName">
            {getFieldDecorator('beanName', {rules: [{required: true, message: 'beanName不能为空'}]})(<Input placeholder="输入任务beanName"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="methodName">
            {getFieldDecorator('methodName', {rules: [{required: true, message: 'methodName不能为空'}]})(<Input placeholder="输入任务methodName"/>)}
          </FormItem>

          <FormItem {...formItemLayout} label="参数">
            {getFieldDecorator('params')(<Input placeholder="输入任务参数，JSON数据"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="任务类型">
            {getFieldDecorator('type', {rules: [{required: true, message: '任务类型不能为空'}]})(
              <Radio.Group onChange={this.onChangeType}>
                <Radio value="1">单次任务</Radio>
                <Radio value="2">循环任务</Radio>
                <Radio value="3">Cron规则任务</Radio>
              </Radio.Group>
            )}
          </FormItem>
          {
            (type==="1" || type==="2") &&
            <FormItem {...formItemLayout} label="执行时间">
              <DatePicker defaultValue={startTime?moment(startTime, "YYYY-MM-DD HH:mm:ss"):''} showTime disabledDate={disabledDate} placeholder="执行时间，不选则立即执行" style={{"width":"100%"}} onChange={this.onChangeTime} />
              <span className="dark">指定开始执行时间，精确到秒</span>
            </FormItem>
          }

          {
            type==="3" &&
            <div>
              <FormItem {...formItemLayout} label="CRON规则">
                {getFieldDecorator('cron')(<Input placeholder="输入cron规则"/>)}
                <span className="dark">格式如：0/10 * * * * ? 每10秒执行一次</span>
              </FormItem>
            </div>
          }

          {
            type==="2" &&
            <div>
              <FormItem {...formItemLayout} label="执行规则">
                {getFieldDecorator("isWait")(<Select style={{"width":"200px"}}><Select.Option value="0">上一任务执行后：</Select.Option><Select.Option value="1">上一任务执行成功后：</Select.Option></Select>)}
                &nbsp;等待：{getFieldDecorator('period')(<InputNumber placeholder="间隔"/>)} &nbsp;秒，执行下一任务。
              </FormItem>
            </div>
          }
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
