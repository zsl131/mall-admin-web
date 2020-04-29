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
          <p>{record.agentName?record.agentName:record.customNickname}</p>
          <p>{record.agentPhone}</p>
        </div>
      );
    }
  }, {
    title: "日期",
    render: (record)=> {
      return (
        <div>
          <p>所属：{record.produceMonth}</p>
          <p>创建：{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: "提成",
    // dataIndex: 'amount'
    render: (record)=> {
      return (
        <div>
          <Tooltip title={`当月销售排名【${record.orderNo}】`}>
          <p>提成：{record.commissionMoney} 元</p>
          <p>奖励：{record.extraMoney} 元</p>
          </Tooltip>
        </div>
      )
    }
  }, {
    title: "次数",
    // dataIndex: 'money'
    render:(record)=> {
      return (
        <div>
          <p>总共：{record.totalTimes} 次</p>
          <p>已领：{record.receiptTimes} 次</p>
        </div>
      )
    }
  }, {
    title: "剩余",
    render:(record)=> {
      return (
        <div>
          <Tooltip title="剩余领取的奖励"><p>奖励：{record.extraMoney - record.receiptMoney} 元</p></Tooltip>
          <Tooltip title="剩余还可领取的次数"><p>可领：{record.surplusTimes} 次</p></Tooltip>
        </div>
      )
    }
  }, {
    title: '状态',
    render:(record)=> {
      const status = record.status;
      return (
        status==='1'?<p className="blue">已领完</p>:<p className="red">未领完</p>
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
