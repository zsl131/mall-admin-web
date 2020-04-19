import React from 'react';
import { Button, Pagination, Popconfirm, Table, Tooltip } from 'antd';
import styles from '@/pages/admin/carousel/components/list.css';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  handleExc,
  ...listOpts
}) => {

  const columns = [{
    title:"顾客",
    dataIndex: "id",
    render:(text, record)=> {
      return (
        <div>
          <p>{record.nickname}</p>
          <p>{record.phone}</p>
        </div>
      );
    }
  }, {
    title: '产品',
    // dataIndex: 'batchNo'
    render:(record)=> {
      return (
        <div>
          <p>{record.proTitle}</p>
          <p><Tooltip title="产品售价">【{record.price}】</Tooltip>{record.specsName}</p>
        </div>
      )
    }
  }, {
    title: "日期",
    render: (record)=> {
      return (
        <div>
          <p>申请：{record.createTime}</p>
          <p>结束：{record.endTime}</p>
        </div>
      )
    }
  }, {
    title: "描述",
    dataIndex: 'content'
  }, {
    title: "金额",
    // dataIndex: 'money'
    render:(record)=> {
      return (
        genImgs(record.imgs)
      )
    }
  }, {
    title: '状态',
    render:(record)=> {
      const status = record.status;
      return (
        status==='1'?<div><p className="blue">已处理</p><p className="dark">{record.payTime}</p></div>:
        <div>
          <p className="red">未处理</p>
          <p><Tooltip title="点击处理">
            <Popconfirm title="确定售后已经处理完成吗？"  onConfirm={()=>handleExc(record)}>
            <Button type="primary" shape="circle" icon="check" />
            </Popconfirm></Tooltip></p>
        </div>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <div>
        -
        </div>
      );
    }
  }];

  const genImgs = (imgs)=> {
    const array = imgs.split(",");
    return array.map((item, index)=> {
      if(item) {
        return <a href={item} target="_blank" rel="noopener noreferrer">
          <img src={item} alt={index} className={styles.avatarImg}/></a>
      } else {return '';}
    })
  };

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
