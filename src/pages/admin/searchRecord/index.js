import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';
import List from './components/List';
import Filter from './components/Filter';

const SearchRecord = ({
  searchRecord,
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
      dispatch({ type: 'searchRecord/modifyState', payload: {addVisible: true}});
    }
  };*/

  const listOpts = {
    dataSource: searchRecord.datas,
    loading: loading.models.searchRecord,
    location,
    totalElement: searchRecord.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'searchRecord/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'searchRecord/modifyState', payload: {item: record, updateVisible: true} });
    },
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
        <h3><Icon type="bars"/> 搜索记录<b>（{searchRecord.totalElements}）</b></h3>
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

export default connect(({ searchRecord, loading }) => ({ searchRecord, loading }))(SearchRecord);
