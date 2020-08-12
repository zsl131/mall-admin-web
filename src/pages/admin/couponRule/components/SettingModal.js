import React from 'react';
import { Modal, Table } from 'antd';

class SettingModal extends React.Component {

  render() {
    const {
      onOk,
      couponList,
      couponIds,
      item,
      ...modalProps
    } = this.props;

    // console.log(couponList, couponIds)

    const handleOk = (e) => {
      e.preventDefault();
      onOk(item);
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const columns = [{
      title: '名称',
      dataIndex: 'name',
    }, {
      title: '说明',
      dataIndex: 'remark',
    }, {
      title: "价值",
      render: (record) => {
        return (
          <div>
            满<b className="red">{record.reachMoney}元</b>抵<b className="blue">{record.worth}元</b>
          </div>
        )
      }
    }];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.props.onSetIds(selectedRowKeys)
      },
      getCheckboxProps(record) {
        return {
          // defaultChecked: record.id === 1, // 配置默认勾选的列
          defaultChecked: couponIds.includes(record.id)
        };
      },
    };

    return(
      <Modal {...modalOpts} style={{"top":"30px", "minWidth":"70%"}}>
        <p className="dark">勾选要设置的抵价券，并点击“确定”按钮保存设置</p>
        <Table rowSelection={rowSelection} dataSource={couponList} rowKey="id" columns={columns} pagination={false}/>
      </Modal>
    );
  }
}

export default SettingModal;

