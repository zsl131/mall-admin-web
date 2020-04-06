import React from 'react';
import { Form, Icon, Input, Modal, Select, Spin, Switch } from 'antd';
import { formItemLayout } from '@/utils/common';
import { httpGet } from '@/utils/normalService';

const FormItem = Form.Item;
const {Option} = Select;

@Form.create()
class AddModal extends React.Component {

  state = {
    fetching: false,
    keyword: '',
    proList: []
  };

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        setFieldsValue
      },
      ...modalProps
    } = this.props;

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        values.status = values.status?"1":"0";
        if(!errors) {
          onOk(values);
        }
      });
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const {fetching, keyword, proList} = this.state;

    const fetchProduct = (e) => {
      //console.log(e);
      if(!this.state.fetching) {
        this.setState({fetching: true, proList: []});
        let api = {apiCode: "productService.searchByTitle", title: e};
        httpGet(api).then((res)=> {
          //console.log(res);
          this.setState({fetching: false, proList: res.proList});
        })
      }
    };

    const handleProductChange = (e) => {
      //console.log(e);
      setFieldsValue({proId: e.key, proTitle: e.label});
    };

    return(
      <Modal {...modalOpts} >
        <Form layout="horizontal">
          {getFieldDecorator('proId')(<Input type="hidden" placeholder="输入标签名称"/>)}
          {getFieldDecorator('proTitle')(<Input type="hidden" placeholder="输入标签名称"/>)}
          <FormItem {...formItemLayout} label="产品标签">
            {getFieldDecorator('name', {rules: [{required: true, message: '标签名称不能为空'}]})(<Input placeholder="输入标签名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="关联产品">
            {getFieldDecorator("pro")(
              <Select
                showSearch
                value={keyword}
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
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="显示状态">
            {getFieldDecorator("status")(<Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="close" />}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;

