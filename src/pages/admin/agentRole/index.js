import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';
import MatchProModal from './components/MatchProModal';

const AgentRole = ({
  agentRole,
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
  };

  const operatorOpts = {
    onAdd() {
      // console.log("UserIndex operator");
      dispatch({ type: 'agentRole/setModalVisible', payload: {addVisible: true}});
    }
  };

  const listOpts = {
    dataSource: agentRole.datas,
    loading: loading.models.agentRole,
    location,
    totalElement: agentRole.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'agentRole/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'agentRole/update', payload: id });
    },
    onMatchPro: (role) => {
      dispatch({ type: 'agentRole/listProduct', payload: {roleId: role.id} }).then(() => {dispatch({ type: 'agentRole/setModalVisible', payload: {curRole: role, matchProVisible: true} });});

    }
  };

  const proOpts = {
    visible: agentRole.matchProVisible,
    title: "为角色授权产品",
    maskClosable: false,
    confirmLoading: loading.effects['agentRole/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'appModule/setModalVisible', payload: { matchProVisible: false } });
    },
    onCancel() {
      dispatch({ type: 'appModule/setModalVisible', payload: { matchProVisible: false } });
    }
  };

  const addOpts = {
    visible: agentRole.addVisible,
    title: "添加代理角色",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['agentRole/addRole'],
    onOk(datas) {
      dispatch({ type: 'agentRole/addRole', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'agentRole/setModalVisible', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: agentRole.updateVisible,
    title: `修改代理角色[${agentRole.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: agentRole.item,
    confirmLoading: loading.effects['agentRole/updateRole'],
    onOk(datas) {
      dispatch({ type: 'agentRole/setModalVisible', payload: { updateVisible: false } });
      dispatch({ type: 'agentRole/updateRole', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'agentRole/setModalVisible', payload: { updateVisible: false } });
    }
  };

  const filterOpts = {
    onFilter(values) {
      delete query.page; //去除page属性
      handleRefresh({conditions: JSON.stringify(values)});
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 代理角色管理<b>（{agentRole.totalElements}）</b></h3>
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
      {agentRole.addVisible && <AddModal {...addOpts}/>}
      {agentRole.updateVisible && <UpdateModal {...updateOpts}/>}
      {agentRole.matchProVisible && <MatchProModal {...proOpts}/>}
    </div>
  );
}

export default connect(({ agentRole, loading }) => ({ agentRole, loading }))(AgentRole);
