import React from 'react';
import { Button, Icon, Pagination, Popconfirm, Table, Tooltip } from 'antd';
import styles from './list.css';

const List = ({
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const columns = [{
    title: '产品',
    // dataIndex: 'proTitle'
    render: (record) => {
      return (
        <div>
          <p>{record.proTitle}</p>
          <p>{record.specsName}</p>
        </div>
      )
    }
  }, {
    title: '金额',
    // dataIndex: 'content'
    render: (record)=> {
      const status = record.status;
      return (
        <div>
          <Tooltip title="单价">{record.price}</Tooltip>*
          <Tooltip title="数量">{record.amount}</Tooltip>-
          <Tooltip title="退款"><b className="red">{record.backMoney}</b></Tooltip>=
          {
            (status==='-10' || status==='-1' || status==='0')?<Tooltip title="订单已删除或取消或未付款">0</Tooltip>:
              <Tooltip title="剩余"><b className="blue">{record.price*record.amount-record.backMoney}</b></Tooltip>
          }
        </div>
      )
    }
  }, {
    title: '状态',
    render: (text, record) => {
      const status = record.status;
      return (
        <div>
          {status==='1' && <div>已付款，未发货 </div>}
          {status==='2' && <div>已发货 </div>}
          {status==='3' && <span>已完成</span>}
          {status==='0' && <span className="dark">待付款</span>}
          {status==='-1' && <span className="red">已取消</span>}
          {status==='-2' && <span className="red">有售后，已退<b>{record.backMoney}</b></span>}
          {status==='-10' && <span className="red">已删除</span>}
        </div>
      )
    }
  }, {
    title: '订单编号',
    dataIndex: 'ordersNo'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <div>1</div>
      );
    }
  }];

  const handleSetStatus = (record) => {
    //onSetStatus(record);
  };

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
