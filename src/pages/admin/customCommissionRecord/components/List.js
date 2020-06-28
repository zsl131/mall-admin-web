import React from 'react';
import { Pagination, Table } from 'antd';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  handleCash,
  ...listOpts
}) => {

  const columns = [{
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
    title: '产品',
    // dataIndex: 'batchNo'
    render: (record)=> {
      return (
        <div>
          <p>OrderNo:{record.ordersNo}</p>
          <p>{record.proTitle}-[{record.specsName}]</p>
        </div>
      )
    }
  }, {
    title: "顾客",
    render: (record)=> {
      return (
        <div>
          <p>{record.customNickname}</p>
          <p>{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: '状态',
    render:(record)=> {
      const status = record.status;
      return (
        <div>
          <p>可提：{record.money} 元</p>
          <p>
            {status==='-2' && <span title="顾客退单">退单</span>}
            {status==='-1' && <span title="顾客取消订单">取消</span>}
            {status==='0' && <span>待付款</span>}
            {status==='1' && <span title="已付款，但不可提现">已付款</span>}
            {status==='2' && <span title="可提现">可提现</span>}
            {status==='3' && <span title="已提交提现申请">纳入结算</span>}
            {status==='4' && <span title="已转款">已转款</span>}
          </p>
        </div>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <div>
            {record.cashOutBatchNo ? <span>{record.cashOutBatchNo}</span>:"-"}
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
