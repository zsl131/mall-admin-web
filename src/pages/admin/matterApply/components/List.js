import React from 'react';
import { Button, Pagination, Popconfirm, Table, Tooltip } from 'antd';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  handleProcess,
  dataSource,
  ...listOpts
}) => {

  const columns = [{
    title: "客户",
    // dataIndex: 'customNickname'
    render: (record) => {
      return (
        <div>
          <p>{record.nickname}</p>
          <p>{record.shopName}</p>
        </div>
      )
    }
  }, {
    title: '联系',
    // dataIndex: 'name'
    render: (record) => {
      return (
        <div>
          <p>{record.phone}</p>
          <p>{record.email}</p>
        </div>
      )
    }
  }, {
    title: '备注',
    // dataIndex: 'name'
    render: (record) => {
      return (
        <div>
          <p>{record.remark}</p>
          <p>{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: '状态',
    dataIndex: 'id',
    render: (text, record) => {
      const status = record.status;
      return (
        status==='0'?<div>
          <p className="red">未处理</p>
          <p><Tooltip title="点击处理">
            <Popconfirm title="确定此申请已制作并发送其邮箱吗？"  onConfirm={()=>handleProcess(record)}>
              <Button type="primary" shape="circle" icon="check" />
            </Popconfirm></Tooltip></p>
        </div>:<span className="blue">已处理</span>
      );
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <span>-</span>
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
