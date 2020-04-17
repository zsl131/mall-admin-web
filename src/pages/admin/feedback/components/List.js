import React from 'react';
import {Icon, Pagination, Popconfirm, Table} from 'antd';
import styles from "./list.css";

const List = ({
  onPageChange,
  onSetStatus,
  onReply,
  totalElement,
  ...listOpts
}) => {

  const columns = [{
    title: '昵称',
    dataIndex: 'nickname'
  }, {
    title: '内容',
    dataIndex: 'content'
  }, {
    title: '状态',
    render: (text, record) => {
      return (
        <Popconfirm title={`是否设置为：${record.status==='1'?'隐藏':"显示"}`} okText="确定" cancelText="取消" onConfirm={()=>handleSetStatus(record)}>
          <span>{record.status === '1'?"显示":<span><b className={styles.cancelStatus}>隐藏</b></span>}</span>
        </Popconfirm>
      )
    }
  }, {
    title: '日期',
    dataIndex: 'createTime'
  }, {
    title: "回复",
    render: (text, record) => {
      return (
        record.reply?
          <div>
            <p>{record.reply}</p>
            <p>{record.replyTime}</p>
          </div>
          :<span className={styles.cancelStatus}>未回复</span>
      );
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
          <a href="###" onClick={()=>onReply(record)}><Icon type="export"/> 回复</a>
      );
    }
  }];

  const handleSetStatus = (record) => {
    onSetStatus(record);
  }

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  }

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
}

export default List;
