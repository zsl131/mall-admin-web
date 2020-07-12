import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';
import List from './components/List';
import Filter from './components/Filter';

const OrdersProduct = ({
  ordersProduct,
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
      dispatch({ type: 'ordersProduct/modifyState', payload: {addVisible: true}});
    }
  };*/

  const listOpts = {
    dataSource: ordersProduct.datas,
    loading: loading.models.ordersProduct,
    location,
    totalElement: ordersProduct.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'ordersProduct/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'ordersProduct/modifyState', payload: {item: record, updateVisible: true} });
    },
    onExpress: (obj)=> {
      dispatch({ type: 'ordersProduct/onExpress', payload: obj });
    },
    showExpress: (obj)=> {
      dispatch({ type: 'ordersProduct/showExpress', payload: obj });
    },
    onAfterSale: (obj)=> {
      dispatch({ type: 'ordersProduct/modifyState', payload: {ordersProductProduct: obj, afterSaleVisible: true} });
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
        <h3><Icon type="bars"/> 订单管理<b>（{ordersProduct.totalElements}）</b></h3>
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

export default connect(({ ordersProduct, loading }) => ({ ordersProduct, loading }))(OrdersProduct);
