import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const Topic = ({
  topic,
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
    msg:"添加文章",
    onAdd() {
      dispatch({ type: 'topic/modifyState', payload: {addVisible: true} });
    }
  };

  const listOpts = {
    dataSource: topic.datas,
    loading: loading.models.topic,
    location,
    item: topic.item,
    totalElement: topic.totalElements,
    specsVisible: topic.specsVisible,
    specsList: topic.specsList,
    onDelConfirm: (record) => {
      dispatch({ type: 'topic/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
      dispatch({ type: 'topic/modifyState', payload: {item: record, updateVisible: true} });
    },
  };

  const addOpts = {
    visible: topic.addVisible,
    title: "添加产品信息",
    selectCate: topic.selectCate,
    maskClosable: false,
    confirmLoading: loading.effects['topic/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'topic/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'topic/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'topic/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: topic.updateVisible,
    title: `修改数据[${topic.item.title}]`,
    item: topic.item,
    selectCate: topic.selectCate,
    maskClosable: false,
    confirmLoading: loading.effects['topic/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'topic/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'topic/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'topic/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 文章管理<b>（{topic.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {topic.addVisible && <AddModal {...addOpts}/>}
      {topic.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ topic, loading }) => ({ topic, loading }))(Topic);
