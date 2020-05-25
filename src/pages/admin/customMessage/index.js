import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';
import List from './components/List';
import Filter from './components/Filter';
import ReplyModal from '@/pages/admin/feedback/components/ReplyModal';

const CustomMessage = ({
  customMessage,
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
      dispatch({ type: 'customMessage/modifyState', payload: {addVisible: true}});
    }
  };*/

  const listOpts = {
    dataSource: customMessage.datas,
    loading: loading.models.customMessage,
    location,
    totalElement: customMessage.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'customMessage/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onReply: (record) => {
      dispatch({ type: 'customMessage/modifyState', payload: {item: record, replyVisible: true} });
    }
  };

  const replyOpts = {
    visible: customMessage.replyVisible,
    item: customMessage.item,
    title: '回复反馈',
    okText: '确定回复',
    cancelText: '取消',
    maskClosable:false,
    onCancel: () => {
      dispatch({type: 'customMessage/modifyState', payload: {replyVisible:false}});
    },
    onOk: (values) => {
      dispatch({ type: 'customMessage/onReply', payload: values }).then(()=>{
        dispatch({ type: 'customMessage/modifyState', payload: {replyVisible: false} });
        handleRefresh();
      });
    }
  }

  const filterOpts = {
    onFilter(values) {
      delete query.page; //去除page属性
      handleRefresh({conditions: JSON.stringify(values)});
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 客服消息管理<b>（{customMessage.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {customMessage.replyVisible && <ReplyModal {...replyOpts}/>}
    </div>
  );
}

export default connect(({ customMessage, loading }) => ({ customMessage, loading }))(CustomMessage);
