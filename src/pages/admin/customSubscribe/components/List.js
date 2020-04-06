import React from 'react';
import { Pagination, Table } from 'antd';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  dataSource,
  ...listOpts
}) => {

  const columns = [{
    title: "客户",
    dataIndex: 'customNickname'
  }, {
    title: '消息',
    // dataIndex: 'name'
    render: (record) => {
      return (
        <p>{record.messageName}[{record.messageSn}]</p>
      )
    }
  }, {
    title: '状态',
    dataIndex: 'id',
    render: (text, record) => {
      const status = record.status;
      return (
        status==='0'?<span className="red">未订阅</span>:<span className="blue">已订阅</span>
      );
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <span>-</span>
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

  const tableOpts = {
    dataSource: dataSource,
    ...listOpts
  };

  return (
      <Table {...tableOpts} columns={columns} rowKey="id" pagination={false} footer={pager} />
  );
};

export default List;
