import React from 'react';
import { Menu, Pagination, Popconfirm, Table } from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';

const List = ({
  onDelConfirm,
  onUpdate,handleSubmitConfirm,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '接口ID',
    dataIndex:'iid'
  }, {
    title: '状态',
    // dataIndex: 'name'
    render: (record) => {
      return (<span>{record.status === '1'?<span className="blue">正常</span>:<span className="red">异常</span>}</span>)
    }
  }, {
    title: '签名',
    dataIndex: 'sign'
  }, {
    title: '内容',
    dataIndex: 'content'
  }, {
    title: '原因',
    dataIndex: 'reason'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.content} {...delOpts}>
          {
            record.status!=='1'?
              <Menu.Item key={record.id + 10}>
                <Popconfirm onConfirm={()=>{handleSubmitConfirm(record.id)}} title={`确定重新提交吗？`}>重新提交</Popconfirm>
                {/*<Link to={`/admin/activity/record?actId=${record.id}`}><Icon type="smile-o"/> 开展活动</Link>*/}
              </Menu.Item>:""
          }
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
