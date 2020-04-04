import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const Module = ({
                  dispatch,
                  loading,
                  module,
                  location
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
    onAdd: () => {
      dispatch({ type: 'module/modifyState', payload: {addVisible: true}});
    },
    onSynch: () => {
      dispatch({ type: 'module/onSynch', payload: {}}).then(() => {handleRefresh()});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: module.data,
    loading: loading.models.module,
    location,
    totalElement: module.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'module/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      dispatch({ type: 'module/onUpdate', payload: id });
    },
    handleSubmitConfirm: (id)=> {
      console.log(id);
      dispatch({ type: 'module/reSubmit', payload: id }).then(() => {handleRefresh()});
    }
  }

  const addOpts = {
    visible: module.addVisible,
    title: "添加短信模板",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['module/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'module/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'module/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'module/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: module.updateVisible,
    title: `修改数据[${module.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: module.item,
    confirmLoading: loading.effects['module/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'module/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'module/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'module/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 短信模板管理<b>（{module.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {module.addVisible && <AddModal {...addOpts}/>}
      {module.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, module }) => ({ loading, module }))(Module);
