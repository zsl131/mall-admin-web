import React from 'react';
import { Pagination, Table } from 'antd';
import ListOperator from '@/components/ListOperator';
import { DragableBodyRow } from '@/components/common/DragTable';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const ListCategory = ({
  onDelConfirm,
  onUpdate,
  stopTask,
  startTask,
  onPageChange,
  totalElement,
  dataSource,
  changeOrderNo,
  ...listOpts
}) => {

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: '分类名称',
    dataIndex: 'name'
  }, {
    title: 'SN',
    dataIndex: 'sn'
  }, {
    title: "序号",
    dataIndex: "orderNo"
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

  const handlerRow = (dragIndex, hoverIndex) => {
    const obj1 = dataSource[dragIndex], obj2 = dataSource[hoverIndex];
    changeOrderNo({id1: obj1.id, no1: obj1.orderNo, id2: obj2.id, no2: obj2.orderNo});
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <Table {...tableOpts} columns={columns} rowKey="taskName" pagination={false} footer={pager}
           components={components}
           onRow={(record, index) => ({
             index,
             moveRow: handlerRow,
           })}
    />
    </DndProvider>
  );
};

export default ListCategory
