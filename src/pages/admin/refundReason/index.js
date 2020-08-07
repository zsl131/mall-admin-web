import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon } from 'antd';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const RefundReason = ({
  refundReason,
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
    msg:"添加退款原因",
    onAdd() {
      dispatch({ type: 'refundReason/modifyState', payload: {addVisible: true}});
    },
    handlerOrderNo: () => {
      dispatch({ type: 'refundReason/initOrderNo', payload:{} }).then(()=>{handleRefresh()});
    }
  };

  const listOpts = {
    dataSource: refundReason.datas,
    loading: loading.models.refundReason,
    location,
    totalElement: refundReason.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'refundReason/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'refundReason/modifyState', payload: {item: record, updateVisible: true} });
    },
  };

  const addOpts = {
    visible: refundReason.addVisible,
    title: "添加退款原因",
    maskClosable: false,
    confirmLoading: loading.effects['refundReason/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'refundReason/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'refundReason/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'refundReason/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: refundReason.updateVisible,
    title: `修改数据[${refundReason.item.reason}]`,
    item: refundReason.item,
    maskClosable: false,
    confirmLoading: loading.effects['refundReason/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'refundReason/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'refundReason/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'refundReason/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 退款原因管理<b>（{refundReason.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {refundReason.addVisible && <AddModal {...addOpts}/>}
      {refundReason.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ refundReason, loading }) => ({ refundReason, loading }))(RefundReason);
