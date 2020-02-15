import React from 'react';
import { Pagination, Table } from 'antd';

const List = ({
  onDelConfirm,
  onUpdate,
  stopTask,
  startTask,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const columns = [{
    title:"客户",
    dataIndex: "id",
    render:(text, record)=> {
      return (
        <span>{record.nickname}</span>
      );
    }
  }, {
    title: '关键字',
    dataIndex: 'keyword'
  }, {
    title: "次数",
    dataIndex: 'count'
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
