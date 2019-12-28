import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const AgentLevelSpecsRate = ({
  agentLevelSpecsRate,
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
      dispatch({ type: 'agentLevelSpecsRate/modifyState', payload: {addVisible: true}});
    }
  };

  const listOpts = {
    dataSource: agentLevelSpecsRate.datas,
    loading: loading.models.agentLevelSpecsRate,
    location,
    totalElement: agentLevelSpecsRate.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'agentLevelSpecsRate/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'agentLevelSpecsRate/modifyState', payload: {item: record, updateVisible: true} });
    },
  };

  const addOpts = {
    visible: agentLevelSpecsRate.addVisible,
    title: "添加数据",
    maskClosable: false,
    confirmLoading: loading.effects['agentLevelSpecsRate/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'agentLevelSpecsRate/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'agentLevelSpecsRate/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'agentLevelSpecsRate/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: agentLevelSpecsRate.updateVisible,
    title: `修改数据[${agentLevelSpecsRate.item.name}]`,
    item: agentLevelSpecsRate.item,
    maskClosable: false,
    confirmLoading: loading.effects['agentLevelSpecsRate/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'agentLevelSpecsRate/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'agentLevelSpecsRate/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'agentLevelSpecsRate/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 代理等级管理<b>（{agentLevelSpecsRate.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {agentLevelSpecsRate.addVisible && <AddModal {...addOpts}/>}
      {agentLevelSpecsRate.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ agentLevelSpecsRate, loading }) => ({ agentLevelSpecsRate, loading }))(AgentLevelSpecsRate);
