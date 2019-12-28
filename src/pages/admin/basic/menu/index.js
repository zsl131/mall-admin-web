import React from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Button, Popconfirm } from 'antd';
import LeftTree from './components/LeftTree';
import List from './components/List';
import { routerRedux } from 'dva/router'
import UpdateModal from './components/UpdateModal';
import { httpSort } from '@/utils/normalService';

const Menu = ({
  loading,
  menu,
  location,
  dispatch
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

  const treeOpts = {
    menuTree: menu.menuTree,
    onSelect: (obj) => {
      handleRefresh({"pid":obj.pid});
      dispatch({ type: 'menu/setState', payload: { pid: obj.pid, curName: obj.name } });
      // dispatch({ type: 'menu/showChildren', payload: key[0] });
    }
  };

  const listOpts = {
    dataSource: menu.datas,
    rowKey: 'id',
    pid: menu.pid,
    totalElements: menu.totalElements,
    loading: loading.models.menu,
    onUpdate: (item) => {
      dispatch({ type: 'menu/setState', payload: { item: item, updateVisible: true } });
    },
    onDelete: (id) => {
      dispatch({ type: "menu/deleteMenu", payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      console.log(page);
    },
    changeOrderNo: (obj) => {
      // dispatch({ type: "menu/changeOrderNo", payload: obj }).then(() => {handleRefresh()});
      httpSort(obj).then(() => {handleRefresh()});
    }
  };

  const updateOpts = {
    visible: menu.updateVisible,
    title: `修改菜单【${menu.item.name}】`,
    item: menu.item,
    maskClosable: false,
    onCancel:() => {
      dispatch({ type: 'menu/setState', payload: { updateVisible: false } });
    },
    onOk:(obj) => {
      // console.log("onOk::"+obj,"string::"+ JSON.stringify(obj));
      dispatch({ type: 'menu/update', payload: obj }).then(() => {
        dispatch({ type: 'menu/setState', payload: { updateVisible: false } });
        handleRefresh();
      });
    }
  };

  const handlerConfirm = () => {
    // dispatch()
    dispatch({ type: 'menu/init', payload:{} }).then(()=>{handleRefresh()});
  };

  const handlerOrderNo = () => {
    dispatch({ type: 'menu/initOrderNo', payload:{} }).then(()=>{handleRefresh()});
  };

  return(
    <div style={{"height":"100%", "overflowY": 'hidden'}}>
      <Row style={{"height":"100%"}}>
        <Col span={5} style={{"height":"100%"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={19}>
          <div className="listHeader">
            <h3><Icon type="bars"/> 菜单管理<b>（{menu.totalElements}）</b>【<span className="red">{menu.curName}</span>】</h3>
            <div className="listOperator">
              <Popconfirm title="确定重新生成菜单序号吗？" placement="bottom" onConfirm={handlerOrderNo}>
                <Button type="default" icon="reload">重构菜单序号</Button>
              </Popconfirm>
              &nbsp;&nbsp;
              <Popconfirm title="确定重构所有菜单吗？" placement="bottom" cancelText="取消" okText="确定" onConfirm={handlerConfirm}>
                <Button type="dashed" icon="reload">重构菜单</Button>
              </Popconfirm>
            </div>
          </div>
          <List {...listOpts}/>
          {menu.updateVisible && <UpdateModal {...updateOpts}/>}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({ loading, menu }) => ({ loading, menu }))(Menu);
