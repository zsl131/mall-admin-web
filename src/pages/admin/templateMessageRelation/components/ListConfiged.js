import React from 'react';
import {Button, Popconfirm, Table} from 'antd';

const ListConfiged = ({
  onDelConfirm,
  ...listOpts
}) => {

  const columns = [{
    title: '名称',
    // dataIndex: 'templateName'
    render: (record) => {
      return (
        <div>
          <p>{record.templateName}</p>
          <p>{record.templatePinyin}</p>
        </div>
      );
    }
  }, {
    title: '模板ID',
    dataIndex: "templateId"
  }, {
    title: '键值对',
    dataIndex: 'keyValues'
  }, {
    title: '操作',
    render: (record) => {
      return (
        <Popconfirm title={`确定删除【${record.templateName}】吗？`} onConfirm={()=>onDelConfirm(record)}>
          <Button type="danger" icon="close">删除模板</Button>
        </Popconfirm>
      );
    }
  }];

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} />
  );
}

export default ListConfiged;
