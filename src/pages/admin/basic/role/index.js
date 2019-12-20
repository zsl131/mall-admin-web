import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import MatchMenuModal from './components/MatchMenuModal';
import List from './components/List';
import Filter from './components/Filter';

const Role = ({
  role,
  location,
  dispatch,
  loading
}) => {
  const { query, pathname } = location;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        ...newQuery,
      },
    }));
  }

  const operatorOpts = {
    onAdd() {
      // console.log("UserIndex operator");
      dispatch({ type: 'role/setModalVisible', payload: {addVisible: true}});
    }
  }

  const listOpts = {
    dataSource: role.datas,
    loading: loading.models.role,
    location,
    totalElement: role.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'role/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'role/update', payload: id });
    },
    onMatchMenu: (curRole) => {
      dispatch({ type: 'role/queryMenus', payload: {rid: curRole.id}}).then(() => { dispatch({ type: 'role/setModalVisible', payload: {curRole: curRole} }) });
    }
  }

  const addOpts = {
    visible: role.addVisible,
    title: "添加角色",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['role/addRole'],
    onOk(datas) {
      dispatch({ type: 'role/addRole', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'role/setModalVisible', payload: { addVisible: false } });
    }
  }
  const updateOpts = {
    visible: role.updateVisible,
    title: `修改角色[${role.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: role.item,
    confirmLoading: loading.effects['role/updateRole'],
    onOk(datas) {
      dispatch({ type: 'role/setModalVisible', payload: { updateVisible: false } });
      dispatch({ type: 'role/updateRole', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'role/setModalVisible', payload: { updateVisible: false } });
    }
  }

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  }

  const treeOpts = {
    role: role,
    onSelect: (key) => {
      dispatch({ type: 'role/queryMenus', payload: { pid: key[0], rid: role.curRole.id } });
    },
    onCancel: ()=>{
      dispatch({ type: 'role/setModalVisible', payload: { matchMenuVisible: false } });
    },

    onPageChange: (page) => {
      // console.log("page::"+page);
      dispatch({ type: 'role/queryMenus', payload: { page: page-1, rid: role.curRole.id } });
    },
    onSetMenu: (key) => {
      // console.log("setMenu"+key, "roleId:"+role.curRole.id);
      dispatch({ type: 'role/authMenu', payload: {rid: role.curRole.id, mid: key} });
    },
    loading: loading.effects.role
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 角色管理<b>（{role.totalElements}）</b></h3>
        {/*<div className="listOperator"><Button type="primary" icon="plus">添加用户</Button></div>*/}
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        {/*<Table dataSource={users.datas} columns={columns} loading={loading.models.users} rowKey="id"/>*/}
        <List {...listOpts} />
      </div>
      {role.addVisible && <AddModal {...addOpts}/>}
      {role.updateVisible && <UpdateModal {...updateOpts}/>}
      {role.matchMenuVisible && <MatchMenuModal {...treeOpts}/>}
    </div>
  );
}

export default connect(({ role, loading }) => ({ role, loading }))(Role);
