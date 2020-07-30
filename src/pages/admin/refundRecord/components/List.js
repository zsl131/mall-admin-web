import React from 'react';
import { Button, Pagination, Popconfirm, Table, Tooltip } from 'antd';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  handleCash,
  ...listOpts
}) => {

  const columns = [{
    title: '单号',
    render: (record)=> {
      return (
        <div>
          <p>订单号：{record.ordersNo}</p>
          <p>退单号：{record.refundNo}</p>
        </div>
      );
    }
  },{
    title:"代理",
    dataIndex: "id",
    render:(text, record)=> {
      return (
        <div>
          <p>{record.agentName}</p>
          <p>{record.agentPhone}</p>
        </div>
      );
    }
  }, {
    title: '操作员',
    // dataIndex: 'batchNo'
    render: (record)=> {
      return (
        <div>
          <p>{record.optName}</p>
          <p>{record.optUsername}</p>
        </div>
      );
    }
  }, {
    title: "日期",
    render: (record)=> {
      return (
        <div>
          <p>{record.ordersProTitle}</p>
          <p>{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: "退款金额",
    // dataIndex: 'money'
    render:(record)=> {
      return (
        <b className="blue">{record.backMoney} 元</b>
      )
    }
  }, {
    title: '状态',
    render:(record)=> {
      const status = record.status;
      return (
        <div>
          <p>{status==='-1'?<span className="red">退款失败</span>:<span className="blue">退款成功</span>}</p>
          <p>{record.resCode}-{record.resCodeDes}</p>
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
