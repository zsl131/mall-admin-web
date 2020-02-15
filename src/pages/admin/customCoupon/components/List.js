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
    title:"优惠券",
    dataIndex: "id",
    render:(text, record)=> {
      return (
        <div>
          <p>{record.couponName}</p>
          <p>{record.remark}</p>
        </div>
      );
    }
  }, {
    title: '指定产品',
    // dataIndex: 'proTitle'
    render: (record)=> {
      return (
        <div>
          <p>{record.proId?record.proTitle:"通用券"}</p>
          <p>领取于：{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: "日期",
    render: (record) => {
      return (
        <div>
          <p>领取：{record.createTime}</p>
          <p>到期：{record.endTime}</p>
        </div>
      )
    }
  }, {
    title: "用户",
    render: (record)=> {
      const status = record.status;
      return (
        <div>
          <p>{record.nickname}</p>
          <p>状态：{status===1?"待使用":(status===2?<span className="red">过期</span>:<span className="blue">已使用</span>)}</p>
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
