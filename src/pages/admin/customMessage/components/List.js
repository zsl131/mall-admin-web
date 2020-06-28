import React from 'react';
import { Icon, Pagination, Table } from 'antd';
import styles from '@/pages/admin/carousel/components/list.css';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  onRelationImage,
  onReply,
  ...listOpts
}) => {

  /*const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };*/

  const columns = [{
    title:"客户",
    dataIndex: "id",
    render:(text, record)=> {
      return (
        <div>
          <p><a href={record.headImgUrl} target="_blank" rel="noopener noreferrer"><img src={record.headImgUrl} alt={record.nickname} className={styles.avatarImg}/></a></p>
          <p>{record.nickname}</p>
        </div>
      );
    }
  }, {
    title: '消息',
    render:(text, record) => {
      return (
        <div>
          <p>msgId: {record.msgId}</p>
          <p>msgType: {record.msgType}</p>
        </div>
      )
    }
  }, {
    title: "内容",
    render:(record)=> {
      const msgType = record.msgType;
      return (
        <div>
          {msgType==='text'?<p>{record.content}</p>:
            <a href={record.picUrl} target="_blank" rel="noopener noreferrer"><img src={record.picUrl} alt={record.nickname} className={styles.avatarImg}/></a>
          }
          {
            record.reply?<p>回复：{record.reply}</p>:""
          }
        </div>
      )
    }
  }, {
    title: "日期",
    render: (record)=> {
      return (
        <div>
          {record.createTime}
        </div>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <div>
          <a href="###" onClick={()=>onReply(record)}><Icon type="export"/> 回复</a>
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
