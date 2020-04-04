import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import List from './components/List';
import Filter from './components/Filter';

const SendRecord = ({
                sendRecord,
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
  }

  const listOpts = {
    dataSource: sendRecord.datas,
    loading: loading.models.sendRecord,
    location,
    totalElement: sendRecord.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
  }

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 短信发送记录<b>（{sendRecord.totalElements}）</b>[剩余：<b style={{"color":"#ff7800"}}>{sendRecord.surplus}</b> 条]</h3>
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

export default connect(({ sendRecord, loading }) => ({ sendRecord, loading }))(SendRecord);
