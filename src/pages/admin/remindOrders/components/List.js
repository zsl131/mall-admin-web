import React from 'react';
import { Pagination, Table } from 'antd';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  onRelationImage,
  onUpdateType,
  ...listOpts
}) => {

  const columns = [{
    title: '订单号',
    dataIndex: 'ordersNo',
  }, {
    title: "日期",
    dataIndex: 'createTime'
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
