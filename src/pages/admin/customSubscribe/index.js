import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon } from 'antd';
import List from './components/List';
import Filter from './components/Filter';
import { httpSort } from '@/utils/normalService';

const CustomSubscribe = ({
  customSubscribe,
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

  const listOpts = {
    dataSource: customSubscribe.datas,
    loading: loading.models.customSubscribe,
    location,
    totalElement: customSubscribe.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'customSubscribe/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'customSubscribe/modifyState', payload: {item: record, updateVisible: true} });
    },
    changeOrderNo: (obj) => {
      httpSort(obj).then(() => {handleRefresh()});
    },
    modifyStatus: (obj)=> {
      dispatch({ type: 'customSubscribe/modifyStatus', payload: obj}).then(() => {handleRefresh()});
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
        <h3><Icon type="bars"/> 客户订阅消息情况<b>（{customSubscribe.totalElements}）</b><span className="dark">用于查看客户订阅消息的情况</span></h3>
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

export default connect(({ customSubscribe, loading }) => ({ customSubscribe, loading }))(CustomSubscribe);
