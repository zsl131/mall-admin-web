import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon } from 'antd';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';
import { httpSort } from '@/utils/normalService';

const ProductTag = ({
  productTag,
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
    msg:"添加标签",
    onAdd() {
      dispatch({ type: 'productTag/modifyState', payload: {addVisible: true}});
    },
    handlerOrderNo: () => {
      dispatch({ type: 'productTag/initOrderNo', payload:{} }).then(()=>{handleRefresh()});
    }
  };

  const listOpts = {
    dataSource: productTag.datas,
    loading: loading.models.productTag,
    location,
    totalElement: productTag.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'productTag/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'productTag/modifyState', payload: {item: record, updateVisible: true} });
    },
    changeOrderNo: (obj) => {
      httpSort(obj).then(() => {handleRefresh()});
    },
    modifyStatus: (obj)=> {
      dispatch({ type: 'productTag/modifyStatus', payload: obj}).then(() => {handleRefresh()});
    },
  };

  const addOpts = {
    visible: productTag.addVisible,
    title: "添加产品标签",
    maskClosable: false,
    confirmLoading: loading.effects['productTag/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'productTag/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'productTag/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'productTag/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: productTag.updateVisible,
    title: `修改数据[${productTag.item.name}]`,
    item: productTag.item,
    maskClosable: false,
    confirmLoading: loading.effects['productTag/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'productTag/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'productTag/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'productTag/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 产品标签管理<b>（{productTag.totalElements}）</b><span className="dark">用于移动端搜索的推荐</span></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {productTag.addVisible && <AddModal {...addOpts}/>}
      {productTag.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ productTag, loading }) => ({ productTag, loading }))(ProductTag);
