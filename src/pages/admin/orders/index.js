import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';
import List from './components/List';
import Filter from './components/Filter';
import ExpressModal from '@/pages/admin/orders/components/ExpressModal';

const Orders = ({
  orders,
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
      dispatch({ type: 'orders/modifyState', payload: {addVisible: true}});
    }
  };*/

  const listOpts = {
    dataSource: orders.datas,
    loading: loading.models.orders,
    location,
    totalElement: orders.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'orders/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'orders/modifyState', payload: {item: record, updateVisible: true} });
    },
    onExpress: (obj)=> {
      dispatch({ type: 'orders/onExpress', payload: obj });
    }
  };

  const filterOpts = {
    onFilter(values) {
      delete query.page; //去除page属性
      handleRefresh({conditions: JSON.stringify(values)});
    }
  };

  const expOpts = {
    visible: orders.expressVisible,
    title: "发货",
    maskClosable: false,
    orders: orders.item,
    companyList: orders.companyList,
    express: orders.express,
    confirmLoading: loading.effects['orders/express'],
    onOk: (obj) => {
      dispatch({ type: 'orders/modifyState', payload: { expressVisible: false } });
      dispatch({ type: 'orders/express', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'orders/modifyState', payload: { expressVisible: false } });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 订单管理<b>（{orders.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {orders.expressVisible && <ExpressModal {...expOpts}/>}
    </div>
  );
}

export default connect(({ orders, loading }) => ({ orders, loading }))(Orders);
