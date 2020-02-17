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
    title:"产品标题",
    dataIndex: "proTitle"
  }, {
    title: '预计发货日期',
    dataIndex: 'deliveryDate'
  }, {
    title: "状态",
    render: (record)=> {
      const status = record.status;
      return (
        status==='1'?<span className="blue">预售中</span>:<span className="red">取消预售</span>
      )
    }
  }, {
    title: '操作',
    dataIndex: 'id',
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
