import React from 'react';
import {Pagination, Table} from 'antd';

const List = ({
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const columns = [{
    title: '手机号码',
    dataIndex: 'phone'
  }, {
    title: '发送时间',
    dataIndex: 'createTime'
  }, {
    title: '内容',
    dataIndex: 'content'
  }, {
    title: '结果',
    dataIndex: 'msg'
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
