import React from 'react';
import { Icon, Menu, Pagination, Table } from 'antd';
import ListOperator from '@/components/ListOperator';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  dataSource,
  handleDetail,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: 'SN',
    // dataIndex: 'name'
    render: (record) => {
      return (
        <div>
          <b className="blue">{record.ruleSn}</b>
        </div>
      )
    }
  }, {
    title: '名称',
    // dataIndex: 'proTitle'
    render: (record)=> {
      return (
        <div>
        {/*record.couponId?record.couponName:<span className='red'>未关联</span>*/}
          <p>{record.name}</p>
        </div>
      )
    }
  }, {
    title: '操作',
    dataIndex: 'id',
    render: (text, record) => {
      return (
        <ListOperator id={record} delName={record.name} {...delOpts}>
          <Menu.Item>
            <span onClick={()=>handleDetail(record)}><Icon type="team"/> 配置券</span>
          </Menu.Item>
        </ListOperator>
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
        <Table {...tableOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
};

export default List;
