import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import List from './components/List';
import Filter from './components/Filter';
import ListPaper from '@/pages/admin/agent/components/ListPaper';
import VerifyModal from '@/pages/admin/agent/components/VerifyModal';
import PassVerifyModal from '@/pages/admin/agent/components/PassVerifyModal';

const Agent = ({
  agent,
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
      dispatch({ type: 'agent/modifyState', payload: {addVisible: true}});
    }
  };*/

  const listOpts = {
    dataSource: agent.datas,
    loading: loading.models.agent,
    location,
    totalElement: agent.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'agent/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'agent/modifyState', payload: {item: record, updateVisible: true} });
    },
    showPapers: (record)=> {
      //console.log(record);
      dispatch({type: 'agent/listPapers', payload: record});
    },
    onVerify:(record, status, msg, flag) => {
      if(status==="1") {
        //dispatch({type: 'agent/verify', payload: {id: record.id, status: status}});
        dispatch({type: 'agent/onPassVerify', payload: record});
      } else {
        dispatch({type: 'agent/modifyState', payload: {item: record, verifyVisible: flag}});
      }
    }
  };

  const addOpts = {
    visible: agent.addVisible,
    title: "添加数据",
    maskClosable: false,
    confirmLoading: loading.effects['agent/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'agent/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'agent/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'agent/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: agent.updateVisible,
    title: `修改数据[${agent.item.name}]`,
    item: agent.item,
    maskClosable: false,
    confirmLoading: loading.effects['agent/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'agent/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'agent/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'agent/modifyState', payload: { updateVisible: false } });
    }
  };

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  };

  const paperOpts = {
    visible: agent.paperVisible,
    title: `资质信息[${agent.item.name}]`,
    maskClosable: false,
    paperList: agent.paperList,
    onOk: (obj) => {
      dispatch({ type: 'agent/modifyState', payload: { paperVisible: false } });
    },
    onCancel: () => {
      dispatch({ type: 'agent/modifyState', payload: { paperVisible: false } });
    }
  };

  const verifyOpts = {
    visible: agent.verifyVisible,
    title: `驳回申请[${agent.item.name}]`,
    maskClosable: false,
    onOk: (obj) => {
      //console.log(obj);
      obj.id = agent.item.id;
      obj.status = "2";
      obj.level = 0;
      dispatch({ type: 'agent/modifyState', payload: { verifyVisible: false } });
      dispatch({type: 'agent/verify', payload: obj}).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'agent/modifyState', payload: { verifyVisible: false } });
    }
  };

  const passVerifyOpts = {
    visible: agent.passVerifyVisible,
    title: `通过申请[${agent.item.name}]`,
    maskClosable: false,
    item:agent.item,
    levelList: agent.levelList,
    onOk: (obj) => {
      obj.id = agent.item.id;
      obj.status = "1";
      dispatch({ type: 'agent/modifyState', payload: { passVerifyVisible: false } });
      dispatch({type: 'agent/verify', payload: obj}).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'agent/modifyState', payload: { passVerifyVisible: false } });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 代理管理<b>（{agent.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {agent.addVisible && <AddModal {...addOpts}/>}
      {agent.updateVisible && <UpdateModal {...updateOpts}/>}
      {agent.paperVisible && <ListPaper {...paperOpts}/>}
      {agent.verifyVisible && <VerifyModal {...verifyOpts}/>}
      {agent.passVerifyVisible && <PassVerifyModal {...passVerifyOpts}/>}
    </div>
  );
}

export default connect(({ agent, loading }) => ({ agent, loading }))(Agent);
