import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon } from 'antd';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';
import { httpSort } from '@/utils/normalService';

const SubscribeMessage = ({
  subscribeMessage,
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
    msg:"添加订阅消息模板",
    onAdd() {
      dispatch({ type: 'subscribeMessage/modifyState', payload: {addVisible: true}});
    },
    handlerOrderNo: () => {
      dispatch({ type: 'subscribeMessage/initOrderNo', payload:{} }).then(()=>{handleRefresh()});
    }
  };

  const listOpts = {
    dataSource: subscribeMessage.datas,
    loading: loading.models.subscribeMessage,
    location,
    totalElement: subscribeMessage.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'subscribeMessage/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'subscribeMessage/modifyState', payload: {item: record, updateVisible: true} });
    },
    changeOrderNo: (obj) => {
      httpSort(obj).then(() => {handleRefresh()});
    },
    modifyStatus: (obj)=> {
      dispatch({ type: 'subscribeMessage/modifyStatus', payload: obj}).then(() => {handleRefresh()});
    },
  };

  const addOpts = {
    visible: subscribeMessage.addVisible,
    title: "添加订阅消息模板",
    maskClosable: false,
    confirmLoading: loading.effects['subscribeMessage/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'subscribeMessage/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'subscribeMessage/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'subscribeMessage/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: subscribeMessage.updateVisible,
    title: `修改数据[${subscribeMessage.item.name}]`,
    item: subscribeMessage.item,
    maskClosable: false,
    confirmLoading: loading.effects['subscribeMessage/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'subscribeMessage/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'subscribeMessage/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'subscribeMessage/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 订阅消息模板管理<b>（{subscribeMessage.totalElements}）</b><span className="dark">用于推送消息给用户</span></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {subscribeMessage.addVisible && <AddModal {...addOpts}/>}
      {subscribeMessage.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ subscribeMessage, loading }) => ({ subscribeMessage, loading }))(SubscribeMessage);
