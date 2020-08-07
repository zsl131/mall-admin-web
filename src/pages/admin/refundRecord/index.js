import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';
import List from './components/List';
import Filter from './components/Filter';
import VerifyModal from './components/VerifyModal';

const RefundRecord = ({
  refundRecord,
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
      dispatch({ type: 'refundRecord/modifyState', payload: {addVisible: true}});
    }
  };*/

  const listOpts = {
    dataSource: refundRecord.datas,
    loading: loading.models.refundRecord,
    location,
    totalElement: refundRecord.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'refundRecord/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'refundRecord/modifyState', payload: {item: record, updateVisible: true} });
    },
    handleCash: (record)=> {
      dispatch({ type: 'refundRecord/handleCash', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    verifyApply: (flag, record) => {
      if(flag==='2') {
        dispatch({ type: 'refundRecord/modifyState', payload: {item: record, verifyVisible: true} });
      } else {
        dispatch({ type: 'refundRecord/verify', payload: {id: record.id, flag: flag, reason: '通过'} }).then(() => {handleRefresh()});
      }
      // console.log(flag, record)
    }
  };

  const filterOpts = {
    onFilter(values) {
      delete query.page; //去除page属性
      handleRefresh({conditions: JSON.stringify(values)});
    }
  };

  const verifyOpts = {
    visible: refundRecord.verifyVisible,
    title: "驳回退款申请",
    item: refundRecord.item,
    maskClosable: false,
    confirmLoading: loading.effects['refundRecord/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'refundRecord/modifyState', payload: { verifyVisible: false } });
      dispatch({ type: 'refundRecord/verify', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'refundRecord/modifyState', payload: { verifyVisible: false } });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 退款记录<b>（{refundRecord.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {refundRecord.verifyVisible && <VerifyModal {...verifyOpts}/>}
    </div>
  );
}

export default connect(({ refundRecord, loading }) => ({ refundRecord, loading }))(RefundRecord);
