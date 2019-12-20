import React from 'react';
import {Modal, Table} from 'antd';

export default class RoleModal extends React.Component {

  render() {

    const handleOk = (e) => {
      e.preventDefault();
      this.props.onOk();
    }

    const columns = [{
      title: '角色名称',
      dataIndex: 'name',
    }, {
      title: 'SN',
      dataIndex: 'sn',
    }];

    const authRoleIds = this.props.authRoleIds;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.props.onSetRole(selectedRowKeys)
      },
      getCheckboxProps(record) {
        return {
          // defaultChecked: record.id === 1, // 配置默认勾选的列
          defaultChecked: authRoleIds.includes(record.id)
        };
      },
    };

    return(
      <Modal {...this.props} onOk={handleOk}>
        <p className="dark">勾选要设置的角色，并点击“确定”按钮保存设置</p>
        <Table rowSelection={rowSelection} dataSource={this.props.roleList} rowKey="id" columns={columns} pagination={false}></Table>
      </Modal>
    );
  }
}
