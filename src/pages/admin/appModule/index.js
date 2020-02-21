import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon } from 'antd';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';
import { httpSort } from '@/utils/normalService';

const AppModule = ({
  appModule,
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
    msg:"添加App模块",
    onAdd() {
      dispatch({ type: 'appModule/modifyState', payload: {addVisible: true}});
    },
    handlerOrderNo: () => {
      dispatch({ type: 'appModule/initOrderNo', payload:{} }).then(()=>{handleRefresh()});
    }
  };

  const listOpts = {
    dataSource: appModule.datas,
    loading: loading.models.appModule,
    location,
    totalElement: appModule.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'appModule/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'appModule/modifyState', payload: {item: record, updateVisible: true} });
    },
    modifyStatus: (obj)=> {
      dispatch({ type: 'appModule/modifyStatus', payload: obj}).then(() => {handleRefresh()});
    },
    changeOrderNo: (obj) => {
      // dispatch({ type: "appModule/changeOrderNo", payload: obj }).then(() => {handleRefresh()});
      httpSort(obj).then(() => {handleRefresh()});
    }
  };

  const addOpts = {
    visible: appModule.addVisible,
    title: "添加通知公告",
    maskClosable: false,
    confirmLoading: loading.effects['appModule/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'appModule/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'appModule/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'appModule/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: appModule.updateVisible,
    title: `修改数据[${appModule.item.txt}]`,
    item: appModule.item,
    maskClosable: false,
    confirmLoading: loading.effects['appModule/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'appModule/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'appModule/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'appModule/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> APP端功能模板管理<b>（{appModule.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {appModule.addVisible && <AddModal {...addOpts}/>}
      {appModule.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ appModule, loading }) => ({ appModule, loading }))(AppModule);
