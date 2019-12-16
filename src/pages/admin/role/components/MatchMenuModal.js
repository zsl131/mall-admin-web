import React from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Icon } from 'antd';
import LeftTree from '../../menu/components/LeftTree';
import ListMenu from './ListMenu';

const MatchMenuModal = ({
  role,
  onSelect,
  onCancel,
  onPageChange,
  onSetMenu,
  loading,
}) => {
  const treeOpts = {
    menuTree: role.menuTree,
    onSelect: (key) => {
      onSelect(key);
    },
  };

  const listOpts = {
    onPageChange: onPageChange,
    dataSource: role.menuList,
    rowKey: 'id',
    totalElements: role.menuElements,
    loading: loading.models.role,
    onSetMenu:onSetMenu,
    curAuthMenu: role.curAuthMenu
  };

  return (
    <Modal visible={role.matchMenuVisible} style={{ "minWidth": '80%', top: 30 }} title={`为角色【${role.curRole.name}】授权菜单`} footer={false} onCancel={onCancel}>
      <p className="red">只能单个选择，不能选择标题栏全选</p>
      <div style={{"height":"100%", "overflowY": 'hidden'}}>
      <Row style={{"height":"100%"}}>
        <Col span={7} style={{"height":"100%"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={17}>
          <div className="listHeader">
            <h3><Icon type="bars"/> 菜单列表<b>（{role.menuElements}）</b></h3>
          </div>
          <ListMenu {...listOpts}/>
        </Col>
      </Row>
    </div>
    </Modal>
  );
}

export default connect(({ loading }) => ({ loading }))(MatchMenuModal);
