import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import List from './components/List';
import Filter from './components/Filter';
import RelationModal from '@/pages/admin/customer/components/RelationModal';

const Customer = ({
  customer,
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
      dispatch({ type: 'customer/modifyState', payload: {addVisible: true}});
    }
  };*/

  const listOpts = {
    dataSource: customer.datas,
    loading: loading.models.customer,
    location,
    totalElement: customer.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'customer/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'customer/modifyState', payload: {item: record, updateVisible: true} });
    },
    onRelationImage: (record)=> {
      dispatch({ type: 'customer/onImageRelation', payload: {item: record, relationVisible: true} });
    }
  };

  const addOpts = {
    visible: customer.addVisible,
    title: "添加数据",
    maskClosable: false,
    confirmLoading: loading.effects['customer/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'customer/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'customer/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'customer/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: customer.updateVisible,
    title: `修改数据[${customer.item.name}]`,
    item: customer.item,
    maskClosable: false,
    confirmLoading: loading.effects['customer/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'customer/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'customer/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'customer/modifyState', payload: { updateVisible: false } });
    }
  };

  const filterOpts = {
    onFilter(values) {
      delete query.page; //去除page属性
      handleRefresh({conditions: JSON.stringify(values)});
    }
  };

  const relationOpts = {
    visible: customer.relationVisible,
    title: `设置【${customer.item.nickname}】影像墙权限`,
    item: customer.item,
    type: customer.type,
    maskClosable: false,
    confirmLoading: loading.effects['customer/setRelationType'],
    onOk: (obj) => {
      dispatch({ type: 'customer/modifyState', payload: { relationVisible: false } });
    },
    onCancel() {
      dispatch({ type: 'customer/modifyState', payload: { relationVisible: false } });
    },
    setRelation: (obj) => {
      dispatch({ type: 'customer/setRelation', payload: obj });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 客户管理<b>（{customer.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {customer.addVisible && <AddModal {...addOpts}/>}
      {customer.updateVisible && <UpdateModal {...updateOpts}/>}
      {customer.relationVisible && <RelationModal {...relationOpts}/>}
    </div>
  );
}

export default connect(({ customer, loading }) => ({ customer, loading }))(Customer);
