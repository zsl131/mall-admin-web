import React from 'react';
import { Icon, Pagination, Popconfirm, Popover, Table } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragableBodyRow } from '@/components/common/DragTable';

class List extends React.Component {

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  render() {
    const {
      onPageChange,
      onUpdate,
      onDelete,
      dataSource,
      pid,
      changeOrderNo,
      totalElements,
      ...listOpts
    } = this.props;

    const columns = [{
      title: '序号',
      dataIndex: 'orderNo'
    }, {
      title: '图标',
      render: (text, record) => {
        return (
          record.icon ? <Icon type={record.icon}/>:<span>-</span>
        );
      }
    }, {
      title: '菜单名称',
      dataIndex: 'name'
    }, {
      title: 'SN',
      dataIndex: 'sn'
    }, {
      title: '连接地址',
      dataIndex: 'href'
    }, {
      title: '操作',
      render: (text, record) => {
        return (
          <Popover content={operators(record)} placement="bottom">
            <span className="ant-dropdown-link">
              操作 <Icon type="down" />
            </span>
          </Popover>
        );
      }
    }];

    const handlerDel = (id) => {
      // console.log("---", id);
      onDelete(id);
    };

    const operators = (record) => {
      return (
        <div>
          <p><span onClick={()=>handleUpdate(record)}><Icon type="edit"/>&nbsp;&nbsp;修改</span></p>
          <p><Popconfirm title={`确定删除【${record.name}】吗？`} {...delOpts} onConfirm={()=>handlerDel(record.id)}><span><Icon type="close"/>&nbsp;&nbsp;删除</span></Popconfirm></p>
        </div>
      );
    };

    const delOpts = {
      okText: "确定删除",
      cancelText: "取消",
    };

    const handlePageChange = (pageNumber) => {
      onPageChange(pageNumber);
    };

    const pager = () => {
      return (
        <Pagination defaultPageSize={15} total={totalElements} onChange={handlePageChange}/>
      );
    };

    const handleUpdate = (record) => {
      onUpdate(record);
    };

    const handlerRow = (dragIndex, hoverIndex) => {
      // this.setState({loading: true});
      // console.log("------->pid::::", pid);
      const obj1 = dataSource[dragIndex], obj2 = dataSource[hoverIndex];
      // console.log(dataSource[dragIndex], dataSource[hoverIndex]);
      // console.log(dragIndex, hoverIndex);
      changeOrderNo({id1: obj1.id, no1: obj1.orderNo, id2: obj2.id, no2: obj2.orderNo});
    };

    const tableOpts = {
      dataSource: dataSource,
      ...listOpts
    };

    return (
      <DndProvider backend={HTML5Backend}>
        <Table {...tableOpts} columns={columns} onRow={(record, index) => ({
          index,
          moveRow: handlerRow,
        })} pagination={false} footer={pager}
               components={this.components}
        />
      </DndProvider>
    );

  }
}

export default List;
