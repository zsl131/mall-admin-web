import React from 'react';
import { Pagination, Table, Tooltip } from 'antd';

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
            {status==='-2' && <span className="red" title="有售后">售后单</span>}
            {status==='-1' && <span className="red" title="顾客取消订单">取消</span>}
            {status==='0' && <span>待付款</span>}
            {status==='1' && <span className="blue" title="已付款，但不可提现">已付款</span>}
            {status==='2' && <span className="blue" title="可提现">可提现</span>}
            {status==='3' && <span title="已提交提现申请">纳入结算</span>}
            {status==='4' && <span title="已转款" className="yellow">已转款</span>}
            {record.saleFlag==='2'?<span className="red" title="有售后">-不可提现</span>:
              <span>{record.saleFlag==='1'?<span className="red" title="有售后">-可提</span>:""}</span>
            }
            {
              record.isAuto==='1' && <span>-自动抵扣佣金</span>
            }
          </p>
        </div>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <div>
          {record.cashOutBatchNo ? <Tooltip title="提现批次号"><span>{record.cashOutBatchNo}</span></Tooltip>:"-"}
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
