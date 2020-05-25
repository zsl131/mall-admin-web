import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon } from 'antd';
import List from './components/List';
import Filter from './components/Filter';

const MatterApply = ({
  matterApply,
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
    dataSource: matterApply.datas,
    loading: loading.models.matterApply,
    location,
    totalElement: matterApply.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    handleProcess: (obj)=> {
      dispatch({ type: 'matterApply/modifyStatus', payload: {id:obj.id, status: '1'}}).then(() => {handleRefresh()});
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
        <h3><Icon type="bars"/> 物料申请管理<b>（{matterApply.totalElements}）</b><span className="dark">实体老板申请物料图片</span></h3>
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

export default connect(({ matterApply, loading }) => ({ matterApply, loading }))(MatterApply);
