import React from 'react';
import {Button, Table} from 'antd';

const ListNoConfig = ({
  onConfig,
  ...listOpts
}) => {

  const columns = [{
    title: '名称',
    dataIndex: 'name'
  }, {
    title: '配置',
    dataIndex: "rules"
  }, {
    title: '操作',
    render: (record) => {
      return (
        <Button type="primary" icon="setting" onClick={()=>onConfig(record)}>配置模板</Button>
      );
    }
  }];

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} />
  );
}

export default ListNoConfig;
