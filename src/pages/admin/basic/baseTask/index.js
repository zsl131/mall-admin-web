import React from 'react';
import { connect } from 'dva';
import { Icon, message } from 'antd';
import { routerRedux } from 'dva/router';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const BaseTask = ({
  baseTask,
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
    onAdd() {
      dispatch({ type: 'baseTask/modifyState', payload: {addVisible: true}});
    }
  };

  const listOpts = {
    dataSource: baseTask.datas,
    loading: loading.models.baseTask,
    location,
    totalElement: baseTask.totalElements,
    stopTask: (id) => {
      dispatch({ type: 'baseTask/stopTask', payload: {taskUuid: id} }).then(() => {handleRefresh()});
    },
    startTask:(id) => {
      dispatch({ type: 'baseTask/startTask', payload: {id: id} }).then(() => {handleRefresh()});
    },
    onDelConfirm: (record) => {
      dispatch({ type: 'baseTask/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
      // console.log("update::", record);
      // dispatch({ type: 'baseTask/update', payload: id });
      if(record.status==="1") {
        message.warn("暂时不提供修改功能，可以先删除该任务再重新发布新任务");
      } else {
        dispatch({ type: 'baseTask/modifyState', payload: {item: record, updateVisible: true} });
      }
    },
  };

  const addOpts = {
    visible: baseTask.addVisible,
    title: "添加任务",
    maskClosable: false,
    confirmLoading: loading.effects['baseTask/addBaseTask'],
    onOk: (obj) => {
      dispatch({ type: 'baseTask/addBaseTask', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'baseTask/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: baseTask.updateVisible,
    title: `修改任务[${baseTask.item.taskDesc}]`,
    item: baseTask.item,
    maskClosable: false,
    confirmLoading: loading.effects['baseTask/updateBaseTask'],
    onOk: (obj) => {
      dispatch({ type: 'baseTask/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'baseTask/updateBaseTask', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'baseTask/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 定时任务管理<b>（{baseTask.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {baseTask.addVisible && <AddModal {...addOpts}/>}
      {baseTask.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ baseTask, loading }) => ({ baseTask, loading }))(BaseTask);
