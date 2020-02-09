import React from 'react';
import { Pagination, Table } from 'antd';
import ListOperator from '@/components/ListOperator';

const List = ({
  onDelConfirm,
  onUpdate,
  stopTask,
  startTask,
  onPageChange,
  totalElement,
  dataSource,
  changeOrderNo,
  modifyStatus,
  modifyRepeat,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: "默认",
    render:(record)=> {
      return (
        <p>{record.isDefault==='1'?"默认":"-"}</p>
      )
    }
  }, {
    title: "姓名",
    // dataIndex: 'orderNo'
    render:(record)=> {
      return (
        <div>
          <p>{record.name}</p>
          <p>{record.nickname}</p>
        </div>
      )
    }
  }, {
    title: '地址',
    // dataIndex: 'name'
    render: (record)=> {
      return (
        <div>
          <p>{record.phone}</p>
          <p>{record.provinceName}{record.cityName}{record.countyName}{record.street}</p>
        </div>
      );
    }
  }, {
    title: '操作',
    dataIndex: "id",
    render: (text, record) => {
      return (
        <p>
        {/*<ListOperator id={record} delName={record.name} {...delOpts}/>*/}
        -
        </p>
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
