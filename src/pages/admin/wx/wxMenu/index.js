import React from 'react';
import { connect } from 'dva';
import { Col, Row } from 'antd';
import { routerRedux } from 'dva/router';
import ListRoot from './components/ListRoot';
import ListProduct from './components/ListProduct';
import LeftTree from './components/LeftTree';


const WxMenu = ({
  wxMenu,
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

  const treeOpts = {
    treeData: wxMenu.treeList,
    onSelect: (key, title) => {
      let selectKey = key[0];
      if(!selectKey) {title = "根分类"; selectKey = 0;}
      //console.log(selectKey.indexOf("child_")<0)
      if(selectKey===0 || selectKey.indexOf("child_")<0) {
        handleRefresh({"pid": selectKey});
        dispatch({ type: 'wxMenu/modifyState', payload: {pid: selectKey, pname: title} });
      }
      // console.log(key[0]);
    }
  };

  const listRootOpts = {
    dataSource: wxMenu.data,
    loading: loading,
    menu: wxMenu.menu,
    addObj: (obj) => {
      dispatch({type: 'wxMenu/addObj', payload: obj}).then(()=>{handleRefresh()});
    },
    updateObj: (obj) => {
      // console.log(obj);
      dispatch({type: 'wxMenu/updateObj', payload: obj}).then(()=>{handleRefresh()});
    },
    deleteObj: (obj) => {
      //console.log(obj);
      dispatch({type: 'wxMenu/deleteObj', payload: obj}).then(()=>{handleRefresh()});
    },
    handlerPublishMenu: () => {
      dispatch({ type: 'wxMenu/handlerPublishMenu', payload:{} }).then(()=>{handleRefresh()});
    },
  };

  const listwxMenuOpts = {
    dataSource: wxMenu.proList,
    loading: loading,
    menu: wxMenu.menu,
  };

  return(
    <div style={{"minHeight":"100%", "overflowY": 'hidden'}}>
      <Row>
        <Col span={6} style={{"minHeight":"100%","borderRight": "1px #c8c8c8 solid"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={18}>
          {(wxMenu.type==="base" || wxMenu.type==="root") && <ListRoot {...listRootOpts}/>}
          {wxMenu.type==="child" && <ListProduct {...listwxMenuOpts}/>}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({ wxMenu, loading }) => ({ wxMenu, loading }))(WxMenu);
