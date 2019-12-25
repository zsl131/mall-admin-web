import React from 'react';
import { connect } from 'dva';
import { Col, Row } from 'antd';
import { routerRedux } from 'dva/router';
import ListRoot from '@/pages/admin/productCategory/components/ListRoot';
import ListProduct from '@/pages/admin/productCategory/components/ListProduct';
import LeftTree from '@/pages/admin/productCategory/components/LeftTree';


const ProductCategory = ({
  productCategory,
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
    treeData: productCategory.treeList,
    onSelect: (key, title) => {
      let selectKey = key[0];
      if(!selectKey) {title = "根分类"; selectKey = 0;}
      handleRefresh({"pid": selectKey});
      // console.log(key[0]);
      dispatch({ type: 'productCategoryCategory/modifyState', payload: {pid: selectKey, pname: title} });
    }
  };

  const listRootOpts = {
    dataSource: productCategory.data,
    loading: loading,
    category: productCategory.category,
    addCategory: (obj) => {
      dispatch({type: 'productCategoryCategory/addCategory', payload: obj}).then(()=>{handleRefresh()});
    },
    updateCategory: (obj) => {
      // console.log(obj);
      dispatch({type: 'productCategoryCategory/updateCategory', payload: obj}).then(()=>{handleRefresh()});
    },
    deleteCategory: (obj) => {
      //console.log(obj);
      dispatch({type: 'productCategoryCategory/deleteCategory', payload: obj}).then(()=>{handleRefresh()});
    }
  };

  const listproductCategoryOpts = {
    dataSource: productCategory.proList,
    loading: loading,
    category: productCategory.category,
  };

  return(
    <div style={{"minHeight":"100%", "overflowY": 'hidden'}}>
      <Row>
        <Col span={6} style={{"minHeight":"100%","borderRight": "1px #c8c8c8 solid"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={18}>
          {(productCategory.type==="base" || productCategory.type==="root") && <ListRoot {...listRootOpts}/>}
          {productCategory.type==="child" && <ListProduct {...listproductCategoryOpts}/>}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({ productCategory, loading }) => ({ productCategory, loading }))(ProductCategory);
