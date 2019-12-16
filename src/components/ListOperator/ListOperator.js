import React from 'react';
import {Dropdown, Icon, Menu, Popconfirm} from 'antd';

const ListOperator = ({
  id,
  delName,
  onDelConfirm,
  onUpdate,
  children,
  ...opts
}) => {

  const handleConfirm = () => {
    // console.log("handleConfirm", id,delName);
    onDelConfirm(id);
  }
  const handleUpdate = () => {
    onUpdate(id);
  }

  const dropdownMenu = (
    <Menu>
      {children}
      <Menu.Item key="0">
        <span onClick={handleUpdate}><Icon type="edit"/> 修改</span>
      </Menu.Item>
      <Menu.Item key="1">
        <Popconfirm okType="danger" onConfirm={handleConfirm} title={`确定删除[${delName}]？此操作不可逆！`} {...opts}><Icon type="close"/> 删除</Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={dropdownMenu}>
      <span className="ant-dropdown-link">
        操作 <Icon type="down" />
      </span>
    </Dropdown>
  );
}
export default ListOperator;
