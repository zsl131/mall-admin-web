import React from 'react';
import { Form, Icon, Input, Modal, Select, Spin, Switch } from 'antd';
import { formItemLayout } from '@/utils/common';
import { httpGet } from '@/utils/normalService';

const FormItem = Form.Item;
const {Option} = Select;

@Form.create()
class UpdateModal extends React.Component {

  state = {
    fetching: false,
    keyword: '',
    proList: []
  };

  componentDidMount() {
    const item = this.props.item;
    const {setFieldsValue} = this.props.form;
    setFieldsValue(item);
  }
  render() {

    const {item, form} = this.props;
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

    const {fetching, keyword, proList} = this.state;

    const fetchProduct = (e) => {
      if(!this.state.fetching) {
        this.setState({fetching: true, proList: []});
        let api = {apiCode: "productService.searchByTitle", title: e};
        httpGet(api).then((res)=> {
          console.log(res);
          this.setState({fetching: false, proList: res.proList});
        })
      }
    };

    const handleProductChange = (e) => {
      //console.log(e);
      setFieldsValue({proId: e.key, proTitle: e.label});
    };

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator('proId')(<Input type="hidden" placeholder="输入标签名称"/>)}
          {getFieldDecorator('proTitle')(<Input type="hidden" placeholder="输入标签名称"/>)}
          <FormItem {...formItemLayout} label="产品标签">
            {getFieldDecorator('name', {rules: [{required: true, message: '标签名称不能为空'}]})(<Input placeholder="输入标签名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="关联产品">
            {getFieldDecorator("pro")(
              <div>
                <p>{item.proTitle}</p>
              <Select
                showSearch
                /*value={keyword}*/
                placeholder="输入产品标题查找"
                defaultActiveFirstOption={false}
                showArrow={false}
                labelInValue={true}
                filterOption={false}
                onSearch={fetchProduct}
                onChange={handleProductChange}
                style={{ width: '100%' }}
                notFoundContent={fetching ? <Spin size="small" /> : null}
              >
                {proList.map(d => (
                  <Option key={d.id}>{d.title}</Option>
                ))}
              </Select>
              </div>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="显示状态">
            {getFieldDecorator("status")(<Switch defaultChecked={item.status==="1"} checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="close" />}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
