import React from 'react';
import {connect} from 'dva';
import {Icon, Tooltip} from 'antd';
import {routerRedux} from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import InvalidModal from './components/InvalidModal';
import DownloadModal from './components/DownloadModal';

const FinanceDetail = ({
  dispatch,
  loading,
  financeDetail,
  location
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

  const operatorOpts = {
    onAdd: () => {
      dispatch({ type: 'financeDetail/modifyState', payload: {downloadVisible: true}});
    }
  }

  const filterOpts = {
    cateList:financeDetail.cateList,
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: financeDetail.data,
    loading: loading.models.financeDetail,
    location,
    totalElement: financeDetail.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'financeDetail/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onInvalid: (obj) => {
      // console.log("update::", id);
      dispatch({ type: 'financeDetail/modifyState', payload: {invalidVisible: true, item: obj}});
    },
    onRecord: (obj)=> {
      dispatch({type: 'financeDetail/loadOne', payload: obj.id});
    }
  }

  const addOpts = {
    maskClosable: false,
    visible: financeDetail.addVisible,
    title: "添加财务流水",
    item: financeDetail.item,
    confirmLoading: loading.effects['financeDetail/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'financeDetail/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'financeDetail/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'financeDetail/modifyState', payload: { addVisible: false } });
    }
  }

  const invalidOpts = {
    visible: financeDetail.invalidVisible,
    title: "作废["+financeDetail.item.title+"]",
    confirmLoading: loading.effects['financeDetail/updateStatus'],
    onOk(datas) {
      datas.id = financeDetail.item.id;
      datas.status = "-1";
      dispatch({ type: 'financeDetail/updateStatus', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'financeDetail/modifyState', payload: { invalidVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'financeDetail/modifyState', payload: { invalidVisible: false } });
    }
  }

  const downloadOpts = {
    visible: financeDetail.downloadVisible,
    title: '下载费用报销单',
    onOk(datas) {
      //console.log(datas);
      const w=window.open('about:blank');
      w.location.href="/api/downloadPdf?month="+datas.month;
    },
    onCancel() {
      dispatch({ type: 'financeDetail/modifyState', payload: { downloadVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 财务管理<b>（{financeDetail.totalElements}）</b>
          <span style={{"paddingLeft": "20px"}}>总览：<Tooltip placement="bottom" title="总收入"><b className="red">{financeDetail.totalIn} 元</b></Tooltip>-
          <Tooltip placement="bottom" title="总支出"><b className="red">{financeDetail.totalOut} 元</b></Tooltip>=
          <Tooltip placement="bottom" title="账面结余"><b className="red">{financeDetail.totalIn - financeDetail.totalOut} 元</b></Tooltip>
            </span>
        </h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {financeDetail.addVisible && <AddModal {...addOpts}/>}
      {financeDetail.invalidVisible && <InvalidModal {...invalidOpts}/>}
      {financeDetail.downloadVisible && <DownloadModal {...downloadOpts}/>}
    </div>
  );
}

export default connect(({ loading, financeDetail }) => ({ loading, financeDetail }))(FinanceDetail);
