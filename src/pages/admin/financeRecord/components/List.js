import React from 'react';
import {Button, Pagination, Table,Popconfirm} from 'antd';
import {getLoginUser} from "../../../../utils/authUtils";

const List = ({
  onShowDetail,
  onVerify,
  onRecord,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const obj = getLoginUser();
  const loginUsername = obj.username;
  // console.log(loginUsername.startsWith(""))
  // console.log(obj);

  const onClick = (record, status) => {
    onVerify(record, status);
  }

  const onRecordClick = (record) => {
    onRecord(record)
  }

  const columns = [{
    title: '账目日期',
    // dataIndex:'orderNo'
    render:(record)=>{
      return (
        <div>
          <p>{record.createTime}</p>
          <p>{record.recordName}</p>
        </div>
      )
    }
  }, {
    title: "金额",
    render:(record)=> {
      return (
        <div>
          <p>{record.flag=='1'?<b className="blue">+{record.amount}</b>:<b className="red">-{record.amount}</b>}（{record.detailCount}条明细）</p>
          <p>据号：<Button onClick={()=>onShowDetail(record)}>{record.ticketNo}</Button></p>
        </div>
      )
    }
  }, {
    title: "状态",
    render:(record)=> {
      return(
        record.status=='1' ? <div><p className="blue">有效</p><a href={"/api/showFinancePdf?ticketNo="+record.ticketNo} target="_blank">打印存档</a></div>:
          (record.status=="-1"?<span className="red">{record.invalidName}:{record.invalidReason}</span>:
            <div><p>待审核</p>{(!record.recordName.startsWith(loginUsername) || loginUsername==='root')?
              <span><Popconfirm onConfirm={()=>onClick(record, "1")} title="确定通过审核吗？此操作不可逆"><Button type="primary" size="small">通过</Button></Popconfirm>
                <Button type="danger" size="small" onClick={()=>onClick(record, "-1")}>作废</Button></span>:""}</div>)
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
