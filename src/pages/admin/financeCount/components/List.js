import React from 'react';
import {Button, Pagination, Table} from 'antd';
import {getLoginUser} from "../../../../utils/authUtils";

const List = ({
  onInvalid,
  onRecord,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const obj = getLoginUser();
  const loginUsername = obj.username;
  //console.log(loginUsername.startsWith(""))
  // console.log(obj);

  const onClick = (record) => {
    onInvalid(record);
  }

  const onRecordClick = (record) => {
    onRecord(record)
  }

  const columns = [{
    title: '日期',
    // dataIndex:'orderNo'
    render:(record)=>{
      return (
        <div>
          <p>报账：{record.recordDate}</p>
          <p>录入：{record.createDate}</p>
        </div>
      )
    }
  }, {
    title: '摘要',
    // dataIndex: 'title'
    render:(record)=>{
      return (
        <div>
          <p>[{record.cateName}]{record.title}</p>
          <p>{record.remark}</p>
        </div>
      )
    }
  }, {
    title: "金额",
    render:(record)=> {
      return (
        <div>
          <p>{record.status=='0'?<span className="blue">未记账</span>:(record.flag=='1'?<b className="blue">+{record.amount}</b>:<b className="red">-{record.amount}</b>)}</p>
          <p>据号：<b>{record.ticketNo}</b></p>
        </div>
      )
    }
  }, {
    title: "人员",
    render:(record)=> {
      return (
        <div>
          <p>经办人：{record.operator}</p>
          <p>记账人：{record.recordName}</p>
        </div>
      )
    }
  }, {
    title: "状态",
    render:(record)=> {
      return(
        record.status=='1' ? <div><p className="blue">有效</p>{(record.recordName.startsWith(loginUsername) || loginUsername==='root')?<Button type="danger" size="small" onClick={()=>onClick(record)}>作废</Button>:""}</div>:
          (record.status=="-1"?<span className="red">{record.invalidName}:{record.invalidReason}</span>:<div><p className="blue">初始</p><Button type="primary" size="small" onClick={()=>onRecordClick(record)}>记账</Button></div>)
      )
    }
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  }

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
}

export default List;
