import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon } from 'antd';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';
import { httpSort } from '@/utils/normalService';

const Carousel = ({
  carousel,
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
    msg:"添加轮播图",
    onAdd() {
      dispatch({ type: 'carousel/modifyState', payload: {addVisible: true}});
    },
    handlerOrderNo: () => {
      dispatch({ type: 'carousel/initOrderNo', payload:{} }).then(()=>{handleRefresh()});
    }
  };

  const listOpts = {
    dataSource: carousel.datas,
    loading: loading.models.carousel,
    location,
    totalElement: carousel.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'carousel/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'carousel/modifyState', payload: {item: record, updateVisible: true} });
    },
    modifyStatus: (obj)=> {
      dispatch({ type: 'carousel/modifyStatus', payload: obj}).then(() => {handleRefresh()});
    },
    changeOrderNo: (obj) => {
      httpSort(obj).then(() => {handleRefresh()});
    }
  };

  const addOpts = {
    visible: carousel.addVisible,
    title: "添加轮播图",
    maskClosable: false,
    confirmLoading: loading.effects['carousel/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'carousel/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'carousel/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'carousel/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: carousel.updateVisible,
    title: `修改数据[${carousel.item.title}]`,
    item: carousel.item,
    maskClosable: false,
    confirmLoading: loading.effects['carousel/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'carousel/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'carousel/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'carousel/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> APP端轮播图管理<b>（{carousel.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {carousel.addVisible && <AddModal {...addOpts}/>}
      {carousel.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ carousel, loading }) => ({ carousel, loading }))(Carousel);
