import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';
import UpdateModal from './components/UpdateModal';
import List from './components/List';
import Filter from './components/Filter';

const WxAccount = ({
  wxAccount,
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
    dataSource: wxAccount.datas,
    loading: loading.models.wxAccount,
    location,
    totalElement: wxAccount.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'wxAccount/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'wxAccount/modifyState', payload: {item: record, updateVisible: true} });
    },
    onRelationImage: (record)=> {
      dispatch({ type: 'wxAccount/onImageRelation', payload: {item: record, relationVisible: true} });
    },
    onUpdateType: (record, newType) => {
      dispatch({ type: 'wxAccount/updateType', payload: { id: record.id, type: newType, oldType: record.type, openid: record.openid } }).then(()=>{handleRefresh()});
    }
  };

  const updateOpts = {
    visible: wxAccount.updateVisible,
    title: `修改数据[${wxAccount.item.name}]`,
    item: wxAccount.item,
    maskClosable: false,
    confirmLoading: loading.effects['wxAccount/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'wxAccount/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'wxAccount/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'wxAccount/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 微信用户管理<b>（{wxAccount.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {wxAccount.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ wxAccount, loading }) => ({ wxAccount, loading }))(WxAccount);
