import React from 'react';
import { Button, Pagination, Popconfirm, Table, Tooltip } from 'antd';
import ListOperator from '@/components/ListOperator';

const List = ({
  onDelConfirm,
  onUpdate,
  stopTask,
  startTask,
  onPageChange,
  totalElement,
  modifyStatus,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: '内容',
    dataIndex: 'content'
  }, {
    title: '状态',
    // dataIndex: 'content'
    render: (record) => {
      const status = record.status;
      return (
        <Tooltip title="点击修改状态">
          <Popconfirm title={`确定修改状态为【${status==="0"?"显示":"不显示"}】吗？`} onConfirm={() => modifyStatus({id: record.id, status: status==="1"?"0":"1"})}>
            <Button type={status==="0"?"danger":"primary"} icon={status==="0"?"eye-invisible":"eye"}>{status==="1"?"显示":"隐藏"}</Button>
          </Popconfirm>
        </Tooltip>
      );
    }
  }, {
    title: "打开方式",
    render: (record)=> {
      const openMode = record.openMode;
      return (
        <div>
        <p><b>{openMode==="0"?"不打开":(openMode==="1"?"弹窗方式打开":"链接跳转方式")}</b></p>
          {openMode==="2" && <span>链接地址：{record.url}</span>}
        </div>
      );
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record} delName={record.content} {...delOpts}/>
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
