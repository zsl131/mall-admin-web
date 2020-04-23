import React from 'react';
import { Pagination, Table } from 'antd';
import ListOperator from '@/components/ListOperator';

const ListMenu = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  dataSource,
  ...listOpts
}) => {
  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: '名称',
    dataIndex: 'name'
  }, {
    title: '类型',
    dataIndex: 'type'
  }, {
    title: '序号',
    dataIndex: 'orderNo'
  }, {
    title: '状态',
    // dataIndex: 'sn'
    render:(record)=> {
      return (
        record.status==='0'?<span className='red'>不展示</span>:<span className="blue">展示</span>
      )
    }
  }, {
    title: "值",
    // dataIndex: "orderNo"
    render:(record)=> {
      const type = record.type;
      //console.log(type)
      return (
        <div>
          {type==='view' && <p>链接：{record.url}</p>}
          {type==='click' && <p>值：{record.optKey}</p>}
          {type==='miniprogram' && <div><p>{record.appid}</p><p>{record.pagePath}</p></div>}
        </div>
      )
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

  return (
    <Table {...tableOpts} columns={columns} rowKey="taskName" pagination={false} footer={pager} />
  );
};

export default ListMenu
