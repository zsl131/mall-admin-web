import React from 'react';
import { Button, Pagination, Popconfirm, Table, Tooltip } from 'antd';
import ListOperator from '@/components/ListOperator';
import styles from './list.css';
import { Player } from 'video-react';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  dataSource,
  totalElement,
  modifyStatus,
  relationProduct,
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
        record.fileType==='1'?
        <a href={record.url} target="_blank" rel="noopener noreferrer"><img src={record.url} alt={record.title} className={styles.avatarImg}/></a>:
        <div className={styles.singleDiv}>
          <Player autoPlay={false} playsInline ref="player" videoId="myVideo">
            <source src={record.url}/>
          </Player>
        </div>
      );
    }
  }, {
    title: '标题',
    // dataIndex: 'title'
    render: (record)=> {
      return(
        <div>
          <p>{record.title}</p>
          <p>{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: '关联产品',
    render: (record)=> {
      const flag = record.relationFlag;
      return (
        <div>
          {flag==='1'?<Tooltip title={`已关联【${record.relationProTitle}】`}><p>{record.relationProTitle}</p></Tooltip>:<span className="red">未关联</span>}
          <Tooltip title="点击配置关联产品">
            <Button type="primary" icon="setting" shape="circle" onClick={()=>relationProduct(record)}/>
          </Tooltip>
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

  return (
    <Table {...tableOpts} columns={columns} rowKey="id" pagination={false} footer={pager} />
  );
};

export default List;
