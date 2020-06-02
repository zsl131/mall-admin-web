import React from 'react';
import { Button, Pagination, Table, Tooltip } from 'antd';
import styles from '@/pages/admin/carousel/components/list.css';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  onRelationImage,
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
          {record.inviterId>0 && <p>推荐者：{record.inviterNickname}</p>}
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
          {/*<p>uid:{record.unionid}</p>*/}
        </div>
      )
    }
  }, {
    title: "日期",
    render: (record)=> {
      return (
        <div>
          <p>最近关注：{record.followTime}</p>
          <p>初次关注：{record.firstFollowTime}</p>
        </div>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <div>
        {/*<ListOperator id={record} delName={record.name} {...delOpts}/>*/}
        <Tooltip title="设置影像墙权限"><Button type="primary" shape="circle" icon="picture" onClick={()=>onRelationImage(record)}/></Tooltip>
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
