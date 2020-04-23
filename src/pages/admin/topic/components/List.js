import React from 'react';
import { Pagination, Table, Tag, Tooltip } from 'antd';
import ListOperator from '@/components/ListOperator';
import IconText from '@/components/common/IconText';

const List = ({
  onDelConfirm,
  onUpdate,
  item,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: '文章标题',
    // dataIndex: 'title'
    render:(record)=> {
      return(
        <div>
          <p className="red">{record.sn}</p>
          <p>{record.title}</p>
        </div>
      )
    }
  }, {
    title: "日期",
    render: (record) => {
      return (
        <div>
          <p>更新：{record.updateTime}</p>
          <p>创建：{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: "次数",
    render: (record) => {
      return (
        <div>
          <Tooltip title="浏览次数"><Tag color="orange"><IconText type="eye" text={record.readCount}/></Tag></Tooltip>
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

  return (
    <div>
      <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
    </div>
  );
};

export default List;
