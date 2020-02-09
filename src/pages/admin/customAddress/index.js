import React from 'react';
import { connect, routerRedux } from 'dva';
import { Icon, message } from 'antd';
import List from './components/List';
import Filter from './components/Filter';

const CustomAddress = ({
  customAddress,
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
    msg:"添加优惠券",
    onAdd() {
      dispatch({ type: 'customAddress/modifyState', payload: {addVisible: true}});
    },
    handlerOrderNo: () => {
      dispatch({ type: 'customAddress/initOrderNo', payload:{} }).then(()=>{handleRefresh()});
    }
  };*/

  const listOpts = {
    dataSource: customAddress.datas,
    loading: loading.models.customAddress,
    location,
    totalElement: customAddress.totalElements,
    onDelConfirm: (record) => {
      /*dispatch({ type: 'customAddress/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});*/
      message.warn("不能删除");
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
  };

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 客户收货地址列表<b>（{customAddress.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {/*{customAddress.addVisible && <AddModal {...addOpts}/>}
      {customAddress.updateVisible && <UpdateModal {...updateOpts}/>}*/}
    </div>
  );
}

export default connect(({ customAddress, loading }) => ({ customAddress, loading }))(CustomAddress);
