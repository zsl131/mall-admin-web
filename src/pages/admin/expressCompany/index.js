import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon } from 'antd';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const ExpressCompany = ({
  expressCompany,
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
    msg:"添加物流公司",
    onAdd() {
      dispatch({ type: 'expressCompany/modifyState', payload: {addVisible: true}});
    },
    handlerOrderNo: () => {
      dispatch({ type: 'expressCompany/initOrderNo', payload:{} }).then(()=>{handleRefresh()});
    }
  };

  const listOpts = {
    dataSource: expressCompany.datas,
    loading: loading.models.expressCompany,
    location,
    totalElement: expressCompany.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'expressCompany/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'expressCompany/modifyState', payload: {item: record, updateVisible: true} });
    },
  };

  const addOpts = {
    visible: expressCompany.addVisible,
    title: "添加物流公司",
    maskClosable: false,
    confirmLoading: loading.effects['expressCompany/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'expressCompany/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'expressCompany/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'expressCompany/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: expressCompany.updateVisible,
    title: `修改数据[${expressCompany.item.name}]`,
    item: expressCompany.item,
    maskClosable: false,
    confirmLoading: loading.effects['expressCompany/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'expressCompany/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'expressCompany/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'expressCompany/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 物流公司管理<b>（{expressCompany.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {expressCompany.addVisible && <AddModal {...addOpts}/>}
      {expressCompany.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ expressCompany, loading }) => ({ expressCompany, loading }))(ExpressCompany);
