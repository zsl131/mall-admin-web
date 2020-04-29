import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';
import List from './components/List';
import Filter from './components/Filter';

const ReceiptRecord = ({
  receiptRecord,
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
      dispatch({ type: 'receiptRecord/modifyState', payload: {addVisible: true}});
    }
  };*/

  const listOpts = {
    dataSource: receiptRecord.datas,
    loading: loading.models.receiptRecord,
    location,
    totalElement: receiptRecord.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'receiptRecord/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'receiptRecord/modifyState', payload: {item: record, updateVisible: true} });
    },
    handleCash: (record)=> {
      dispatch({ type: 'receiptRecord/handleCash', payload: {id: record.id} }).then(() => {handleRefresh()});
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
        <h3><Icon type="bars"/> 奖励金领取情况管理<b>（{receiptRecord.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
    </div>
  );
}

export default connect(({ receiptRecord, loading }) => ({ receiptRecord, loading }))(ReceiptRecord);
