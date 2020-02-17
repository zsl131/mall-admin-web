import React from 'react';
import { Pagination, Table } from 'antd';
import styles from '@/pages/admin/carousel/components/list.css';

const List = ({
  onDelConfirm,
  onUpdate,
  stopTask,
  startTask,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  /*const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };*/

  const columns = [{
    title:"图片",
    dataIndex: "id",
    render:(text, record)=> {
      return (
        <a href={record.headImgUrl} target="_blank" rel="noopener noreferrer"><img src={record.headImgUrl} alt={record.nickname} className={styles.avatarImg}/></a>
      );
    }
  }, {
    title: '昵称',
    dataIndex: 'nickname',
    render:(text, record) => {
      const status = record.status;
      return (
        <div>
          <p>{record.nickname}</p>
          <p>{status==='1'?<b className="blue">关注</b>:<b className="red">取消关注</b>}</p>
        </div>
      )
    }
  }, {
    title: "代理",
    render:(record)=> {
      const agentId = record.agentId;
      return (
        agentId&&agentId>0?
        <div>
          <p>{record.name}</p>
          <p>{record.phone}</p>
        </div>:<span>未关联</span>
      )
    }
  }, {
    title: 'id',
    render: (record)=> {
      return (
        <div>
          <p>oid:{record.openid}</p>
          <p>uid:{record.unionid}</p>
        </div>
      )
    }
  }, {
    title: "日期",
    render: (record)=> {
      return (
        <div>
          <p>初次关注：{record.firstFollowTime}</p>
          <p>最近关注：{record.followTime}</p>
        </div>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <div>
        {/*<ListOperator id={record} delName={record.name} {...delOpts}/>*/}
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
