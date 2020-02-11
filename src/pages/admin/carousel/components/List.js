import React from 'react';
import { Button, Pagination, Popconfirm, Table, Tooltip } from 'antd';
import ListOperator from '@/components/ListOperator';
import styles from "./list.css";
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
  dataSource,
  totalElement,
  modifyStatus,
  changeOrderNo,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title:"图片",
    render:(record)=> {
      return (
        <a href={record.url} target="_blank" rel="noopener noreferrer"><img src={record.url} alt={record.title} className={styles.avatarImg}/></a>
      );
    }
  }, {
    title: '序号',
    dataIndex: 'orderNo'
  }, {
    title: '标题',
    dataIndex: 'title'
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
    title: "打开方式",
    render: (record)=> {
      const openMode = record.openMode;
      return (
        <div>
        <p><b>{openMode==="0"?"不打开":(openMode==="1"?"弹窗方式打开":"链接跳转方式")}</b></p>
          {openMode==="2" && <span>{record.navMode}：{record.content}</span>}
          {openMode==="1" && <span>弹窗内容：{record.content}</span>}
        </div>
      );
    }
  }, {
    title: '操作',
    dataIndex: "id",
    render: (text, record) => {
      return (
        <ListOperator id={record} delName={record.title} {...delOpts}/>
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
    changeOrderNo({type: "Carousel", data: obj});
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
