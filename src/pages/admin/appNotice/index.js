import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon } from 'antd';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const AppNotice = ({
  appNotice,
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
    msg:"添加公告",
    onAdd() {
      dispatch({ type: 'appNotice/modifyState', payload: {addVisible: true}});
    }
  };

  const listOpts = {
    dataSource: appNotice.datas,
    loading: loading.models.appNotice,
    location,
    totalElement: appNotice.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'appNotice/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'appNotice/modifyState', payload: {item: record, updateVisible: true} });
    },
    modifyStatus: (obj)=> {
      dispatch({ type: 'appNotice/modifyStatus', payload: obj}).then(() => {handleRefresh()});
    }
  };

  const addOpts = {
    visible: appNotice.addVisible,
    title: "添加通知公告",
    maskClosable: false,
    confirmLoading: loading.effects['appNotice/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'appNotice/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'appNotice/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'appNotice/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: appNotice.updateVisible,
    title: `修改数据[${appNotice.item.content}]`,
    item: appNotice.item,
    maskClosable: false,
    confirmLoading: loading.effects['appNotice/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'appNotice/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'appNotice/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'appNotice/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> APP端公告管理<b>（{appNotice.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {appNotice.addVisible && <AddModal {...addOpts}/>}
      {appNotice.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ appNotice, loading }) => ({ appNotice, loading }))(AppNotice);
