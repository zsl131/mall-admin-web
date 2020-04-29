import React from 'react';
import { Pagination, Table } from 'antd';

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
          <p>{record.agentName?record.agentName:record.customNickname}</p>
          <p>{record.agentPhone}</p>
        </div>
      );
    }
  }, {
    title: "日期",
    render: (record)=> {
      return (
        <div>
          <p>所属：{record.belongMonth}</p>
          <p>排名：<b className="blue">{record.orderNo}</b></p>
        </div>
      )
    }
  }, {
    title: "成绩",
    // dataIndex: 'amount'
    render: (record)=> {
      return (
        <div>
          <p>提成：{record.commissionMoney} 元</p>
          <p>销售：{record.specsCount} 件</p>
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
