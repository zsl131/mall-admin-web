import React from 'react';
import { Form, Icon, Input, InputNumber, message, Modal, Radio, Switch } from 'antd';
import { confirmModal, formItemLayout_large } from '@/utils/common';
import PictureWall from '@/components/common/PictureWall';
import { httpGet } from '@/utils/normalService';

const FormItem = Form.Item;

@Form.create()
class UpdateModal extends React.Component {

  state = {
    openMode: '',
    oldPic: [],
  };

  componentDidMount() {
    const item = this.props.item;
    const {setFieldsValue} = this.props.form;
    setFieldsValue(item);
    this.setState({openMode: item.openMode, oldPic: [{
        uid: item.id,
        objId: item.id,
        name: item.title,
        status: 'done',
        url: item.url,
      }]});
  }
  render() {

    const {item, form} = this.props;

    //console.log(item)

    const { getFieldDecorator, validateFieldsAndScroll,setFieldsValue} = form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        values.status = values.status?"1":"0";
        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    const onRadioChange = (e) => {
      const val = e.target.value;
      this.setState({openMode: val});
    };

    const onBeforeUpload = (file) => {
      if(file.type.indexOf("image")<0) {
        message.error("只能上传图片格式文件");
        return false;
      }
      return true;
    };

    const onRemove = (file) => {
      return new Promise(function(resolve, reject) {
        confirmModal({
          content: "确定要删除该图片吗？",
          onOk: () => {
            resolve(true);
          },
          onCancel: () => {
            resolve(false);
          }
        });
      });
    };

    const dataConfig = (orderNo) => {
      let config = {objClassName: "Carousel", ticket: this.state.uuid, width: 800};
      config.orderNo=orderNo;
      return config;
    };

    const onFileChange = (file) => {
      //console.log("onFileChange", file);
      if (file.status === 'done') {
        //setFieldsValue({"imgUrl": file.response});
        const url = file.response.data[0].url;
        setFieldsValue({ url: url });
      }
      if (file.status === "removed") {
        const id = file.objId ? file.objId : file.response.data[0].id;
        const obj = { id: id, apiCode: "mediumService.delete" };
        httpGet(obj); //删除
        setFieldsValue({ url: "" });
      }
    };

    const openMode = this.state.openMode;

    return(
      <Modal {...this.props} onOk={handleOk} style={{"minWidth":"80%", "top":"20px"}}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout_large} label="简要标题">
            {getFieldDecorator('title', {rules: [{required: true, message: '简要标题不能为空'}]})(<Input placeholder="输入简要标题"/>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<InputNumber placeholder="排序序号"/>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="显示状态">
            {getFieldDecorator("status")(<Switch defaultChecked={item.status==="1"} checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="close" />}/>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="轮播图片">
            {getFieldDecorator('url', {rules: [{required: true, message: '请上传轮播图'}]})(
              <PictureWall fileList={this.state.oldPic} onBeforeUpload={onBeforeUpload} onRemove={onRemove} type="image" showMsg="轮播图片" data={dataConfig()} onFileChange={onFileChange}/>
            )}
            <span className="dark">尺寸建议：800x430px</span>
          </FormItem>
          <FormItem {...formItemLayout_large} label="打开方式">
            {getFieldDecorator("openMode", {rules: [{required: true, message: '打开方式不能为空'}]})(
              <Radio.Group onChange={onRadioChange}>
                <Radio value="0">不打开</Radio>
                <Radio value="1">弹窗方式打开</Radio>
                <Radio value="2">链接跳转</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formItemLayout_large} label="链接模式">
            {getFieldDecorator('navMode')(<Input disabled={(openMode!=="2")} placeholder="链接模式，如：navigate"/>)}
            <span className="dark">可选：navigate、redirect、switchTab、reLaunch、navigateBack、exit</span>
          </FormItem>
          <FormItem {...formItemLayout_large} label="内容">
            {getFieldDecorator('content')(<Input disabled={(openMode==="0"||openMode==='')}  placeholder="内容部份，可以是链接地址、弹窗内容或不填"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
