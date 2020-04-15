import React from 'react';
import {connect} from 'dva';
import {Icon, Tabs,Badge} from 'antd';
import {routerRedux} from 'dva/router'
import ListNoConfig from "./components/ListNoConfig";
import ConfigModal from './components/ConfigModal';
import ListConfiged from './components/ListConfiged';

const TabPane = Tabs.TabPane;

const TemplateMessageRelation = ({
 dispatch,
 loading,
 templateMessageRelation,
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
  };

  const listConfigedOpts = {
    dataSource: templateMessageRelation.configed,
    loading: loading.models.templateMessageRelation,
    location,
    onDelConfirm: (record) => {
      // console.log(record);
      dispatch({type: "templateMessageRelation/deleteObj", payload: {id: record.id}}).then(()=>handleRefresh());
    }
  };

  const listNoConfigOpts = {
    dataSource: templateMessageRelation.noConfig,
    loading: loading.models.templateMessageRelation,
    location,
    onConfig: (record) => {
      dispatch({type: "templateMessageRelation/modifyState", payload: {configVisible: true, item: record}});
    }
  };

  const modalProps = {
    visible: templateMessageRelation.configVisible,
    title: '配置消息模板【'+templateMessageRelation.item.name+'】',
    item: templateMessageRelation.item,
    onCancel: () => {dispatch({type: "templateMessageRelation/modifyState", payload: {configVisible: false}})},
    onOk: (values) => {
      dispatch({type: "templateMessageRelation/config", payload: values}).then(()=>{dispatch({type: "templateMessageRelation/modifyState", payload: {configVisible: false}}); handleRefresh()});
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 模板消息管理<b></b></h3>
      </div>
      <div className="listContent">
        <div className="card-container">
          <Tabs type="card" style={{"padding":"10px"}}>
            <TabPane tab={<Badge count={templateMessageRelation.configed.length} showZero>已配置模板&nbsp;&nbsp;&nbsp;</Badge>} key="1">
              <ListConfiged {...listConfigedOpts}/>
            </TabPane>
            <TabPane tab={<Badge count={templateMessageRelation.noConfig.length} showZero>未配置模板&nbsp;&nbsp;&nbsp;</Badge>} key="2">
              <ListNoConfig {...listNoConfigOpts}/>
              {templateMessageRelation.configVisible && <ConfigModal {...modalProps}/>}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default connect(({ loading, templateMessageRelation }) => ({ loading, templateMessageRelation }))(TemplateMessageRelation);
