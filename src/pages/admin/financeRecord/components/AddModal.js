import React from 'react';
import {Button, Form, message, Modal, Radio, Select, Tooltip} from 'antd';
import styles from './edit.css';
import AddDetailModal from './AddDetailModal';
import PictureWall from "../../../../components/common/PictureWall";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

@Form.create()
class AddModal extends React.Component {

  state = {
    cateList:[],
    addVisible: false,
    fetching: false,
    index:1,
    detail:[],
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        // console.log(values);
        if(!errors) {
          const detail = this.state.detail;
          if(detail.length<=0) {
            message.error("无任何流水信息，不可提交");
          } else {
            values.details = detail;
            onOk(values);
          }
        }
      });
    }

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

    const setAddVisible = (flag) => {
      this.setState({addVisible: flag});
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    }

    const onAddDetail = () => {
      if(this.state.detail.length>=6) {
        message.warn("最多只能记录6条流水信息");
      } else {
        this.setState({addVisible: true});
      }
    }

    const addDetail = (obj) => {
      let list = this.state.detail;
      let index = this.state.index;
      obj.index = index;
      obj.tickets=[];
      list.push(obj);
      this.setState({detail: list, index: index+1});
    }

    const onFileChange = (file, extra) => {
      // console.log("onFileChange", file);
      // console.log(extra)
      if(file.status === 'done') {
        //setFieldsValue({"imgUrl": file.response});
        // console.log(file.response);
        resetDataByUploadTicket(file.response, extra.index);
      }
    }

    const resetDataByUploadTicket = (url, index) => {
      let detailList = this.state.detail;
      let newDetail = [];
      detailList.map((item) => {
        if(item.index == index) {
          item.tickets.push(url);
        }
        newDetail.push(item);
      })
      // console.log(newDetail);
      this.setState({detail: newDetail});
    }

    const detailOpts = {
      maskClosable: false,
      visible: this.state.addVisible,
      title: '添加流水详情',
      onOk:(values) => {
        setAddVisible(false);
        addDetail(values);
      },
      onCancel:()=> {
        setAddVisible(false);
      }
    }

    const dataTr = ()=> {
        return this.state.detail.map((item)=>{
          return (
            <tr>
              <td>{item.recordDate}</td>
              <td>{item.title}</td>
              <td>{item.cateName}</td>
              <td>{item.price}</td>
              <td>{item.count}</td>
              <td>{item.amount}</td>
              {/*<td>{item.ticketCount}</td>*/}
              <td><Tooltip title="上传凭据">
                <PictureWall fileListLength={5} multiple accept="image/png, image/jpeg, image/gif" showMsg="上传凭据" extra={{"index":item.index}} data={{'path':item.index}} onFileChange={onFileChange}/>
              </Tooltip></td>
            </tr>
          )
        })
    }

    return(
      <Modal {...modalOpts}  style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="账目类别">
            {getFieldDecorator('flag', {rules: [{required: true, message: '请选择类别'}]})(
              <RadioGroup>
                <Radio value="1">进账</Radio>
                <Radio value="-1">出账</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <table className={styles.mytable}>
            <thead>
              <tr>
                <td>日期</td>
                <td>摘要（简要说明）</td>
                <td>会计科目</td>
                <td>单价（元）</td>
                <td>数量</td>
                <td>金额（元）</td>
                {/*<td>附单（张）</td>*/}
                <td>附件</td>
              </tr>
            </thead>
            <tbody>
              {dataTr()}
              <tr>
                <td colSpan={7}>
                  <Button icon="plus" type="primary" onClick={()=>onAddDetail()}>添加流水</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
        <AddDetailModal {...detailOpts}/>
      </Modal>
    );
  }
}

export default AddModal;
