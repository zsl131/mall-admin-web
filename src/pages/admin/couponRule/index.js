import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon } from 'antd';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';
import SettingModal from '@/pages/admin/couponRule/components/SettingModal';

const CouponRule = ({
  couponRule,
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
    msg:"添加规则",
    onAdd() {
      dispatch({ type: 'couponRule/modifyState', payload: {addVisible: true}});
    },
  };

  const listOpts = {
    dataSource: couponRule.datas,
    loading: loading.models.couponRule,
    location,
    totalElement: couponRule.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'couponRule/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'couponRule/modifyState', payload: {item: record, updateVisible: true} });
    },
    handleDetail: (record) => {
      //console.log(record)
      dispatch({ type: 'couponRule/settingDetail', payload: record })
    }
  };

  const addOpts = {
    visible: couponRule.addVisible,
    title: "添加优惠券规则",
    maskClosable: false,
    confirmLoading: loading.effects['couponRule/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'couponRule/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'couponRule/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'couponRule/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: couponRule.updateVisible,
    title: `修改数据[${couponRule.item.name}]`,
    item: couponRule.item,
    maskClosable: false,
    confirmLoading: loading.effects['couponRule/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'couponRule/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'couponRule/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'couponRule/modifyState', payload: { updateVisible: false } });
    }
  };

  const filterOpts = {
    onFilter(values) {
      delete query.page; //去除page属性
      handleRefresh({conditions: JSON.stringify(values)});
    }
  };

  const settingOpts = {
    visible: couponRule.settingVisible,
    title: `配置抵价券[${couponRule.item.name}]`,
    item: couponRule.item,
    maskClosable: false,
    couponList: couponRule.couponList,
    couponIds: couponRule.couponIds,
    confirmLoading: loading.effects['couponRule/updateObj'],
    onOk: (obj) => {
      //console.log(obj);
      dispatch({ type: 'couponRule/modifyState', payload: { settingVisible: false } });
      dispatch({ type: 'couponRule/authCoupon', payload: {ruleId: obj.id, ruleSn: obj.sn, cids: couponRule.tempIds} }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'couponRule/modifyState', payload: { settingVisible: false } });
    },
    onSetIds: (ids) => {dispatch({ type: 'couponRule/modifyState', payload: { tempIds: ids } });}
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 优惠券规则管理<b>（{couponRule.totalElements}）</b><span className="dark">通过ruleSN获取对应事件的优惠券</span></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {couponRule.addVisible && <AddModal {...addOpts}/>}
      {couponRule.updateVisible && <UpdateModal {...updateOpts}/>}
      {couponRule.settingVisible && <SettingModal {...settingOpts}/>}
    </div>
  );
}

export default connect(({ couponRule, loading }) => ({ couponRule, loading }))(CouponRule);
