import React from 'react';
import { Button, Pagination, Popconfirm, Table, Tooltip } from 'antd';
import ListOperator from '@/components/ListOperator';
import { rebuildTime } from '@/utils/common';

const List = ({
  onDelConfirm,
  onUpdate,
  stopTask,
  startTask,
  onPageChange,
  totalElement,
  dataSource,
  changeOrderNo,
  modifyStatus,
  modifyRepeat,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: "名称",
    // dataIndex: 'orderNo'
    render:(record)=> {
      return (
        <div>
          <p>{record.name}</p>
          <p>{record.remark}</p>
        </div>
      )
    }
  }, {
    title: '价值',
    // dataIndex: 'name'
    render: (record)=> {
      return (
        <div>
          <p>满<b className="red">{record.reachMoney}</b>元，减<b className="blue">{record.worth}</b>元</p>
          <p>有效期：{record.duration<=0?<span className="blue">不限时</span>:rebuildTime(record.duration)}</p>
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
          <p>数量：<Tooltip title="剩余数量">{record.surplusCount}</Tooltip>/<Tooltip title="已领取数量">{record.receiveCount}</Tooltip></p>
        </div>
      )
    }
  }, {
    title: '状态',
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
    title: '叠加',
    render: (record) => {
      const canRepeat = record.canRepeat;
      return (
        <Tooltip title="点击修改叠加属性">
          <Popconfirm title={`确定修改为【${canRepeat==="0"?"可叠加":"不可叠加"}】吗？`} onConfirm={() => modifyRepeat({id: record.id, canRepeat: canRepeat==="1"?"0":"1"})}>
            <Button type={canRepeat==="0"?"danger":"primary"} icon={canRepeat==="0"?"eye-invisible":"eye"}>{canRepeat==="1"?"可叠加":"不可叠加"}</Button>
          </Popconfirm>
        </Tooltip>
      );
    }
  }, {
    title: '操作',
    dataIndex: "id",
    render: (text, record) => {
      return (
        <ListOperator id={record} delName={record.name} {...delOpts}/>
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
