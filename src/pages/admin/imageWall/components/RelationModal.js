import React from 'react';
import { Form, Input, message, Modal, Select, Spin } from 'antd';
import { formItemLayout } from '@/utils/common';
import { httpGet } from '@/utils/normalService';

const FormItem = Form.Item;
const {Option} = Select;

@Form.create()
class RelationModal extends React.Component {

  state = {
    fetching: false,
    keyword: '',
    proList: []
  };

  render() {

    const {item, form} = this.props;

    const { getFieldDecorator, validateFieldsAndScroll,setFieldsValue} = form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(values.id && !errors) {
         this.props.onOk(values);
        } else {
          message.error("请输入产品名称查找对应的产品关联后再点“确定”");
        }
      });
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
      setFieldsValue({id: item.id, proId: e.key, proTitle: e.label});
    };

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator('proId')(<Input type="hidden" placeholder="输入标签名称"/>)}
          {getFieldDecorator('proTitle')(<Input type="hidden" placeholder="输入标签名称"/>)}
          <FormItem {...formItemLayout} label="关联产品">
            {item.relationFlag==='1'?item.relationProTitle:<b className="red">未关联</b>}
          </FormItem>
          <FormItem {...formItemLayout} label="修改关联产品">

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
        </Form>
      </Modal>
    );
  }
}

export default RelationModal;
