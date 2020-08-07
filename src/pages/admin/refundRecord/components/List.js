import React from 'react';
import { Button, Pagination, Popconfirm, Table, Tooltip } from 'antd';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  handleCash,
  verifyApply,
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
    title: "产品/日期",
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
        <div>
          {record.type==='1' && <p className="red">{record.reason}</p>}
        <b className="blue">{record.backMoney} 元</b>
        </div>
      )
    }
  }, {
    title: '状态',
    render:(record)=> {
      const status = record.status;
      const type = record.type;
      const flag = record.verifyFlag;
      return (
        <div>
          {
            type!=='1' &&
            <div>
              <p>{status==='-1'?<span className="red">退款失败</span>:<span className="blue">退款成功</span>}</p>
              <p>{record.resCode}-{record.resCodeDes}</p>
            </div>
          }
          {
            type==='1' &&
            <div>
              {
                flag ==='0' && <p><Tooltip title="同意退款"><Popconfirm title="确定同意退款申请吗？此操作将直接退钱给客户且无法撤回！" onConfirm={()=>verifyApply("1", record)}><Button type="primary">同意</Button></Popconfirm></Tooltip>
                  <Tooltip title="拒绝退款"><Button type="danger" onClick={()=>verifyApply("2", record)}>拒绝</Button></Tooltip></p>
              }
              {flag==='1' && <b className="blue">同意退款</b>}
              {flag==='2' && <div><b className="red">拒绝退款</b><p>{record.verfiyReason}</p></div>}
            </div>
          }
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
