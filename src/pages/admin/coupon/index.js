import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon } from 'antd';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';
import { httpSort } from '@/utils/normalService';

const Coupon = ({
  coupon,
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

  const operatorOpts = {
    msg:"添加优惠券",
    onAdd() {
      dispatch({ type: 'coupon/modifyState', payload: {addVisible: true}});
    },
    handlerOrderNo: () => {
      dispatch({ type: 'coupon/initOrderNo', payload:{} }).then(()=>{handleRefresh()});
    }
  };

  const listOpts = {
    dataSource: coupon.datas,
    loading: loading.models.coupon,
    location,
    totalElement: coupon.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'coupon/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'coupon/modifyState', payload: {item: record, updateVisible: true} });
    },
    changeOrderNo: (obj) => {
      httpSort(obj).then(() => {handleRefresh()});
    },
    modifyStatus: (obj)=> {
      dispatch({ type: 'coupon/modifyStatus', payload: obj}).then(() => {handleRefresh()});
    },
    modifyRepeat: (obj)=> {
      dispatch({ type: 'coupon/modifyRepeat', payload: obj}).then(() => {handleRefresh()});
    }
  };

  const addOpts = {
    visible: coupon.addVisible,
    title: "添加优惠券",
    maskClosable: false,
    confirmLoading: loading.effects['coupon/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'coupon/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'coupon/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'coupon/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: coupon.updateVisible,
    title: `修改数据[${coupon.item.name}]`,
    item: coupon.item,
    maskClosable: false,
    confirmLoading: loading.effects['coupon/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'coupon/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'coupon/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'coupon/modifyState', payload: { updateVisible: false } });
    }
  };

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 优惠券管理<b>（{coupon.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {coupon.addVisible && <AddModal {...addOpts}/>}
      {coupon.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ coupon, loading }) => ({ coupon, loading }))(Coupon);
