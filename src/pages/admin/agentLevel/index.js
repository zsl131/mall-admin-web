import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const AgentLevel = ({
  agentLevel,
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
      dispatch({ type: 'agentLevel/modifyState', payload: {addVisible: true}});
    }
  };

  const listOpts = {
    dataSource: agentLevel.datas,
    loading: loading.models.agentLevel,
    location,
    totalElement: agentLevel.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'agentLevel/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'agentLevel/modifyState', payload: {item: record, updateVisible: true} });
    },
  };

  const addOpts = {
    visible: agentLevel.addVisible,
    title: "添加数据",
    maskClosable: false,
    confirmLoading: loading.effects['agentLevel/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'agentLevel/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'agentLevel/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'agentLevel/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: agentLevel.updateVisible,
    title: `修改数据[${agentLevel.item.name}]`,
    item: agentLevel.item,
    maskClosable: false,
    confirmLoading: loading.effects['agentLevel/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'agentLevel/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'agentLevel/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'agentLevel/modifyState', payload: { updateVisible: false } });
    }
  };

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 代理等级管理<b>（{agentLevel.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {agentLevel.addVisible && <AddModal {...addOpts}/>}
      {agentLevel.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ agentLevel, loading }) => ({ agentLevel, loading }))(AgentLevel);
