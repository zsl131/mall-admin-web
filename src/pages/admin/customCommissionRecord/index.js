import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';
import List from './components/List';
import Filter from './components/Filter';

const CustomCommissionRecord = ({
  customCommissionRecord,
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
      dispatch({ type: 'customCommissionRecord/modifyState', payload: {addVisible: true}});
    }
  };*/

  const listOpts = {
    dataSource: customCommissionRecord.datas,
    loading: loading.models.customCommissionRecord,
    location,
    totalElement: customCommissionRecord.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'customCommissionRecord/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'customCommissionRecord/modifyState', payload: {item: record, updateVisible: true} });
    },
    handleCash: (record)=> {
      dispatch({ type: 'customCommissionRecord/handleCash', payload: {id: record.id} }).then(() => {handleRefresh()});
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
        <h3><Icon type="bars"/> 提成名称管理<b>（{customCommissionRecord.totalElements}）</b></h3>
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

export default connect(({ customCommissionRecord, loading }) => ({ customCommissionRecord, loading }))(CustomCommissionRecord);
