import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon, message } from 'antd';
import List from './components/List';
import Filter from './components/Filter';
import { httpSort } from '@/utils/normalService';
import RelationModal from './components/RelationModal';

const ImageWall = ({
  imageWall,
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
    dataSource: imageWall.datas,
    loading: loading.models.imageWall,
    location,
    totalElement: imageWall.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'imageWall/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
       /* dispatch({ type: 'imageWall/modifyState', payload: {item: record, updateVisible: true} });*/
      message.warn("不可修改");
    },
    modifyStatus: (obj)=> {
      dispatch({ type: 'imageWall/modifyStatus', payload: obj}).then(() => {handleRefresh()});
    },
    changeOrderNo: (obj) => {
      httpSort(obj).then(() => {handleRefresh()});
    },
    relationProduct: (obj) => {
      //console.log(obj)
      dispatch({type: "imageWall/modifyState", payload: {item: obj, relationVisible: true}});
    }
  };

  const relationOpts = {
    visible: imageWall.relationVisible,
    title: `关联产品[${imageWall.item.title}]`,
    item: imageWall.item,
    maskClosable: false,
    confirmLoading: loading.effects['imageWall/relationProduct'],
    onOk: (obj) => {
      dispatch({ type: 'imageWall/modifyState', payload: { relationVisible: false } });
      dispatch({ type: 'imageWall/relationProduct', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'imageWall/modifyState', payload: { relationVisible: false } });
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
        <h3><Icon type="bars"/> 影像墙管理<b>（{imageWall.totalElements}）</b></h3>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {imageWall.relationVisible && <RelationModal {...relationOpts}/>}
    </div>
  );
}

export default connect(({ imageWall, loading }) => ({ imageWall, loading }))(ImageWall);
