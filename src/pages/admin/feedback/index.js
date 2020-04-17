import React from 'react';
import { connect } from 'dva';
import {Icon} from 'antd';
import { routerRedux } from 'dva/router'

import Filter from './components/Filter';
import List from './components/List';
import ReplyModal from './components/ReplyModal';

const Feedback = ({
  feedback,
  loading,
  location,
  dispatch,
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
  }

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  }

  const listOpts = {
    dataSource: feedback.datas,
    loading: loading.models.feedback,
    location,
    totalElement: feedback.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onSetStatus: (record) => {
      dispatch({ type: 'feedback/setStatus', payload: record }).then(()=>{
        dispatch({ type: 'feedback/modifyState', payload: {replyVisible: false} });
        handleRefresh();
      });
    },
    onReply: (record) => {
      dispatch({ type: 'feedback/modifyState', payload: {item: record, replyVisible: true} });
    }
  };

  const replyOpts = {
    visible: feedback.replyVisible,
    item: feedback.item,
    title: '回复反馈',
    okText: '确定回复',
    cancelText: '取消',
    maskClosable:false,
    onCancel: () => {
      dispatch({type: 'feedback/modifyState', payload: {replyVisible:false}});
    },
    onOk: (values) => {
      dispatch({ type: 'feedback/onReply', payload: values }).then(()=>{
        dispatch({ type: 'feedback/modifyState', payload: {replyVisible: false} });
        handleRefresh();
      });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 微信反馈管理<b>（{feedback.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {feedback.replyVisible && <ReplyModal {...replyOpts}/>}
    </div>
  );
}

export default connect(({loading, feedback}) => ({loading, feedback}))(Feedback);
