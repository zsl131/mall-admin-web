import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const FinanceCategory = ({
  dispatch,
  loading,
  financeCategory,
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
      dispatch({ type: 'financeCategory/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: financeCategory.data,
    loading: loading.models.financeCategory,
    location,
    totalElement: financeCategory.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'financeCategory/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'financeCategory/onUpdate', payload: id });
    },
  }

  const addOpts = {
    visible: financeCategory.addVisible,
    title: "添加账目分类",
    confirmLoading: loading.effects['financeCategory/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'financeCategory/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'financeCategory/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'financeCategory/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: financeCategory.updateVisible,
    title: `修改数据[${financeCategory.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: financeCategory.item,
    confirmLoading: loading.effects['financeCategory/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'financeCategory/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'financeCategory/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'financeCategory/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 财务分类管理<b>（{financeCategory.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {financeCategory.addVisible && <AddModal {...addOpts}/>}
      {financeCategory.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, financeCategory }) => ({ loading, financeCategory }))(FinanceCategory);
