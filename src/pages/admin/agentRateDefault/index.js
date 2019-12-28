import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import List from './components/List';
import Filter from './components/Filter';

const AgentRateDefault = ({
  agentRateDefault,
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

  /*const operatorOpts = {
    onAdd() {
      dispatch({ type: 'agentRateDefault/modifyState', payload: {addVisible: true}});
    }
  };*/

  const listOpts = {
    dataSource: agentRateDefault.datas,
    loading: loading.models.agentRateDefault,
    location,
    totalElement: agentRateDefault.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'agentRateDefault/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'agentRateDefault/modifyState', payload: {item: record, updateVisible: true} });
    },
  };

  const addOpts = {
    visible: agentRateDefault.addVisible,
    title: "添加数据",
    maskClosable: false,
    confirmLoading: loading.effects['agentRateDefault/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'agentRateDefault/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'agentRateDefault/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'agentRateDefault/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: agentRateDefault.updateVisible,
    title: `修改数据[${agentRateDefault.item.levelName}]`,
    item: agentRateDefault.item,
    maskClosable: false,
    confirmLoading: loading.effects['agentRateDefault/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'agentRateDefault/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'agentRateDefault/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'agentRateDefault/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 代理默认提成标准管理<b>（{agentRateDefault.totalElements}）</b><span className='dark'>当未设置对应提成标准时将使用此配置中的标准</span></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {agentRateDefault.addVisible && <AddModal {...addOpts}/>}
      {agentRateDefault.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ agentRateDefault, loading }) => ({ agentRateDefault, loading }))(AgentRateDefault);
