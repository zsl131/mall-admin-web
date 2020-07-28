import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';
import List from './components/List';
import Filter from './components/Filter';
import ExpressModal from '@/pages/admin/orders/components/ExpressModal';
import AfterSaleModal from '@/pages/admin/orders/components/AfterSaleModal';
import ShowExpressModal from '@/pages/admin/orders/components/ShowExpressModal';

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
    },
    showExpress: (obj)=> {
      dispatch({ type: 'orders/showExpress', payload: obj });
    },
    onAfterSale: (orders, obj)=> {
      //console.log(orders, obj)
      dispatch({ type: 'orders/modifyState', payload: {ordersProduct: obj, item: orders, afterSaleVisible: true} });
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
    productList: orders.productList,
    ordersProduct: orders.ordersProduct,
    confirmLoading: loading.effects['orders/express'],
    onOk: (obj) => {
      dispatch({ type: 'orders/modifyState', payload: { expressVisible: false } });
      dispatch({ type: 'orders/express', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'orders/modifyState', payload: { expressVisible: false } });
    }
  };

  const showExpOpts = {
    visible: orders.listExpressVisible,
    title: "发货",
    maskClosable: false,
    orders: orders.item,
    expressList: orders.expressList,
    confirmLoading: loading.effects['orders/express'],
    onOk: (obj) => {
      dispatch({ type: 'orders/modifyState', payload: { listExpressVisible: false } });
    },
    onCancel() {
      dispatch({ type: 'orders/modifyState', payload: { listExpressVisible: false } });
    }
  };

  const saleOpts = {
    visible: orders.afterSaleVisible,
    title: "售后处理",
    maskClosable: false,
    orders: orders.item,
    ordersProduct: orders.ordersProduct,
    confirmLoading: loading.effects['orders/express'],
    onOk: (obj) => {
      //console.log(obj)
      dispatch({ type: 'orders/modifyState', payload: { afterSaleVisible: false } });
      dispatch({ type: 'orders/afterSale', payload: obj }).then(() => {
        handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'orders/modifyState', payload: { afterSaleVisible: false } });
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
      {orders.afterSaleVisible && <AfterSaleModal {...saleOpts}/>}
      {orders.listExpressVisible && <ShowExpressModal {...showExpOpts}/>}
    </div>
  );
}

export default connect(({ orders, loading }) => ({ orders, loading }))(Orders);
