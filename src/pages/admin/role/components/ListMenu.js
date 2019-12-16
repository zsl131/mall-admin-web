import React from 'react';
import { Table, Pagination } from 'antd'

const ListMenu = ({
  onPageChange,
  totalElements,
  onSetMenu,
  curAuthMenu,
  ...listOpts
}) => {
  const columns = [{
    title: '菜单名称',
    dataIndex: 'name'
  }, {
    title: '连接地址',
    dataIndex: 'href'
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination defaultPageSize={15} total={totalElements} onChange={handlePageChange}/>
    );
  }

  const rowSelection = {
    /*onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      onSetMenu(selectedRowKeys)
    },*/
    onSelect: (record, selected, selectedRows) => {
      // console.log(`record:${record.name},,selected:${selected}`,`selectedRows::${selectedRows}`);
      onSetMenu(record.id);
    },
    getCheckboxProps(record) {
      return {
        // defaultChecked: record.id === 1, // 配置默认勾选的列
        defaultChecked: curAuthMenu.includes(record.id)
      };
    },
  };

  return (
    <Table rowSelection={rowSelection} {...listOpts} columns={columns} pagination={false} footer={pager}></Table>
  );
}

export default ListMenu;
