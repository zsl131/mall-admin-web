import React from 'react';
import { Menu, Icon, Table, Pagination } from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import styles from './list.css';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  location,
  totalElement,
  onMatchRole,
  ...listOpts
}) => {

  const handleMatchRole = (id, nickname) => {
    onMatchRole(id, nickname);
  }

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '用户名',
    dataIndex: 'username'
  }, {
    title: '用户昵称',
    dataIndex: 'nickname'
  }, {
    title: '状态',
    render: (text, record) => {
      return (
        <span className={record.status === 1?styles.status1: styles.status0}>{record.status === 1 ? '启用':'停用'}</span>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.nickname} {...delOpts}>
          <Menu.Item>
            <span onClick={()=>handleMatchRole(record.id, record.nickname)}><Icon type="team"/> 分配角色</span>
          </Menu.Item>
        </ListOperator>
      );
    }
  }];

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
