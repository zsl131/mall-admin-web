import React from 'react';
import {Form, InputNumber, DatePicker, Select, Input} from 'antd';
import moment from 'moment';
import request from "../../../../utils/request";

const Option = Select.Option;

@Form.create()
export default class SingleTr extends React.Component {

  state = {
    cateList:[],
    fetching: false,
  }

  fetchCate = ()=> {
    if(this.state.cateList<=0) {
      request("financeCategoryService.listNoPage", {}, true).then((response) => {
        let data = [];
        data.push( ...response.list.map((item) => ({
          value: ""+item.id,
          text: item.name,
        })));

        this.setState({cateList: data, fetching: false});
      });
    }
  }

  render() {

    const {
      num,
      form: {
        getFieldDecorator,
      },
    } = this.props;

    const disabledDate=(current) => {
      // Can not select days before today and today
      return current && current > moment().endOf('day');
    }

    const objName = "obj"+num;
    return (
      <tr>
        <td>
          {getFieldDecorator(objName+'.recordDate')(<DatePicker style={{"width":"120px"}} disabledDate={disabledDate} placeholder="账目日期" />)}
        </td>
        <td>{getFieldDecorator(objName+'.title')(<Input placeholder="输入账目摘要"/>)}</td>
        <td>
          {getFieldDecorator(objName+".cateId")(
            <Select
              placeholder="选择分类"
              notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
              onFocus={this.fetchCate}
              style={{ width: '120px' }}
            >
              {this.state.cateList.map(d => <Option key={d.value}>{d.text}</Option>)}
            </Select>
          )}
        </td>
        <td>
          {getFieldDecorator(objName+'.price', {rules: [{validator:this.validMoney}]})(<InputNumber placeholder="正数金额"/>)}
        </td>
        <td>{getFieldDecorator(objName+'.count')(<InputNumber step={1} placeholder="正整数"/>)}</td>
        {/*<td></td>*/}
        <td>{getFieldDecorator(objName+'.ticketCount')(<InputNumber step={1} placeholder="正整数"/>)}</td>
      </tr>
    )
  }
}
