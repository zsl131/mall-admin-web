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
        <div>
          <p>{record.nickname}</p>
          <p>{record.createTime}</p>
        </div>
      );
    }
  }, {
    title: '产品',
    // dataIndex: 'proTitle'
    render: (record)=> {
      return (
        <div>
          <p>{record.proTitle}</p>
          <p>{record.specsName}</p>
        </div>
      )
    }
  }, {
    title: "价格",
    render: (record) => {
      return (
        <div><b className="red">￥{record.price}</b>*<b className="red">{record.amount}</b>=<b className="blue">￥{record.price*record.amount}</b></div>
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
