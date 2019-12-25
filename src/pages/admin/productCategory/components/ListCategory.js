import React from 'react';
import { Pagination, Table } from 'antd';
import ListOperator from '@/components/ListOperator';

const ListCategory = ({
  onDelConfirm,
  onUpdate,
  stopTask,
  startTask,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: '分类名称',
    dataIndex: 'name'
  }, {
    title: 'SN',
    dataIndex: 'sn'
  }, {
    title: "序号",
    dataIndex: "orderNo"
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record} delName={record.name} {...delOpts}/>
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
    <Table {...listOpts} columns={columns} rowKey="taskName" pagination={false} footer={pager}/>
  );
};

export default ListCategory
