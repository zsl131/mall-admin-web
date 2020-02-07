import React from 'react';
import { Button, Pagination, Popconfirm, Table, Tooltip } from 'antd';
import ListOperator from '@/components/ListOperator';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { DragableBodyRow } from '@/components/common/DragTable';
import { buildSortObj } from '@/utils/common';

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
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: "序号",
    dataIndex: 'orderNo'
  }, {
    title: '标签名称',
    dataIndex: 'name'
  }, {
    title: '关联产品',
    // dataIndex: 'proTitle'
    render: (record)=> {
      return (
        record.proTitle?record.proTitle:<span className='red'>未关联</span>
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
    title: '操作',
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

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const handlerRow = (dragIndex, hoverIndex) => {
    const obj = buildSortObj(dataSource, dragIndex, hoverIndex);
    changeOrderNo({type: "ProductTag", data: obj});
  };

  return (
    <DndProvider backend={HTML5Backend}>
        <Table {...tableOpts} columns={columns} rowKey="id" pagination={false} footer={pager}
      components={components}
      onRow={(record, index) => ({
        index,
        moveRow: handlerRow,
      })}
      />
    </DndProvider>
  );
};

export default List;
