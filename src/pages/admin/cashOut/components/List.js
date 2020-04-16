import React from 'react';
import { Button, Pagination, Popconfirm, Table, Tooltip } from 'antd';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  handleCash,
  ...listOpts
}) => {

  const columns = [{
    title:"代理",
    dataIndex: "id",
    render:(text, record)=> {
      return (
        <div>
          <p>{record.agentName}</p>
          <p>{record.agentPhone}</p>
        </div>
      );
    }
  }, {
    title: '批准号',
    dataIndex: 'batchNo'
  }, {
    title: "日期",
    render: (record)=> {
      return (
        <div>
          {record.createTime}
        </div>
      )
    }
  }, {
    title: "数量",
    dataIndex: 'amount'
  }, {
    title: "金额",
    // dataIndex: 'money'
    render:(record)=> {
      return (
        <b className="blue">{record.money} 元</b>
      )
    }
  }, {
    title: '状态',
    render:(record)=> {
      const status = record.status;
      return (
        status==='1'?<div><p className="blue">已处理</p><p className="dark">{record.payTime}</p></div>:
        <div>
          <p className="red">未处理</p>
          <p><Tooltip title="点击处理">
            <Popconfirm title="确定此款项已转出吗？"  onConfirm={()=>handleCash(record)}>
            <Button type="primary" shape="circle" icon="check" />
            </Popconfirm></Tooltip></p>
        </div>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <div>
        -
        </div>
      );
    }
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  };

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
};

export default List;
