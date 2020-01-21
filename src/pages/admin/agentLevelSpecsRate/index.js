import React from 'react';
import { connect } from 'dva';
import { Col, Row } from 'antd';
import { routerRedux } from 'dva/router';
import LeftTree from '@/pages/admin/agentLevelSpecsRate/components/LeftTree';
import ListSpecs from '@/pages/admin/agentLevelSpecsRate/components/ListSpecs';

const AgentLevelSpecsRate = ({
  agentLevelSpecsRate,
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
    treeData: agentLevelSpecsRate.treeList,
    onSelect: (key, title) => {
      let selectKey = key[0];
      if(!selectKey) {title = "根分类"; selectKey = 0;}

      //console.log(selectKey, title)
      handleRefresh({"pid": selectKey});
      // console.log(key[0]);
      dispatch({ type: 'agentLevelSpecsRate/modifyState', payload: {pid: selectKey, pname: title} });
    }
  };

  const specsOpts = {
    specsList: agentLevelSpecsRate.specsList,
    levelList: agentLevelSpecsRate.levelList,
    product: agentLevelSpecsRate.product,
    rateList: agentLevelSpecsRate.rateList,
    addOrUpdate: (obj)=> {
      // console.log(obj)
      dispatch({type: "agentLevelSpecsRate/addOrUpdate", payload: obj}).then(()=>handleRefresh());
    }
  };

  return(
    <div style={{"minHeight":"100%", "overflowY": 'hidden'}}>
      <Row>
        <Col span={6} style={{"minHeight":"100%","borderRight": "1px #c8c8c8 solid"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={18}>
          {/*{(agentLevelSpecsRate.type==="base" || agentLevelSpecsRate.type==="root") && <ListRoot {...listRootOpts}/>}
          {agentLevelSpecsRate.type==="child" && <ListProduct {...listproductCategoryOpts}/>}*/}
          { agentLevelSpecsRate.type==="detail" && <ListSpecs {...specsOpts}/> }
          { agentLevelSpecsRate.type!=='detail' && <div style={{"margin":"20px"}}>
            <h2 className="red">点击左边的产品标题后方可设置对应规格下的提成标准</h2>
          </div>}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({ agentLevelSpecsRate, loading }) => ({ agentLevelSpecsRate, loading }))(AgentLevelSpecsRate);
