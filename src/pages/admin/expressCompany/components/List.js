import React from 'react';
import { Pagination, Table } from 'antd';
import ListOperator from '@/components/ListOperator';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  dataSource,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: "ID",
    dataIndex: 'id'
  }, {
    title: '名称',
    dataIndex: 'name'
  }, {
    title: '备注信息',
    render: (record) => {
      return (
        <div>{record.remark}</div>
      );
    }
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

  const tableOpts = {
    dataSource: dataSource,
    ...listOpts
  };

  return (
    <Table {...tableOpts} columns={columns} rowKey="id" pagination={false} footer={pager} />
  );
};

export default List;
