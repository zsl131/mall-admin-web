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
    title: '名称',
    // dataIndex: 'name'
    render: (record) => {
      return (
        <div>
          <p>SN: <b className="blue">{record.ruleSn}</b></p>
          <p>名称：{record.name}</p>
        </div>
      )
    }
  }, {
    title: '关联优惠券',
    // dataIndex: 'proTitle'
    render: (record)=> {
      return (
        record.couponId?record.couponName:<span className='red'>未关联</span>
      )
    }
  }, {
    title: '操作',
    dataIndex: 'id',
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
        <Table {...tableOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
};

export default List;
