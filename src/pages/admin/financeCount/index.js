import React from 'react';
import {connect} from 'dva';
import {Icon, Tooltip, Row, Col, Card} from 'antd';
import {routerRedux} from 'dva/router'
import Filter from './components/Filter';

const FinanceCount = ({
  dispatch,
  loading,
  financeCount,
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

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 财务统计<b></b>
          <span style={{"paddingLeft": "20px"}}>总览：<Tooltip placement="bottom" title="总收入"><b className="red">{financeCount.totalIn} 元</b></Tooltip>-
          <Tooltip placement="bottom" title="总支出"><b className="red">{financeCount.totalOut} 元</b></Tooltip>=
          <Tooltip placement="bottom" title="账面结余"><b className="red">{financeCount.totalIn - financeCount.totalOut} 元</b></Tooltip>
            </span>
        </h3>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent" style={{"padding":"10px 0px"}}>
        <Row>
          <Col span={1}/>
          <Col span={10}>
            <Card title={`按月统计-入账（`+financeCount.in1.length+`）`}>
              {financeCount.in1.map((item)=>(<p><span>{item.name}</span>:<b className="blue">{item.total.toFixed(2)} 元</b></p>))}
            </Card>
          </Col>
          <Col span={2}/>
          <Col span={10}>
            <Card title={`按分类统计-入账（`+financeCount.in2.length+`）`}>
              {financeCount.in2.map((item)=>(<p><span>{item.name}</span>:<b className="blue">{item.total.toFixed(2)} 元</b></p>))}
            </Card>
          </Col>
          <Col span={1}/>
        </Row>

        <Row>
          <Col span={1}/>
          <Col span={10}>
            <Card title={`按月统计-出账（`+financeCount.out1.length+`）`}>
              {financeCount.out1.map((item)=>(<p><span>{item.name}</span>:<b className="blue">{item.total.toFixed(2)} 元</b></p>))}
            </Card>
          </Col>
          <Col span={2}/>
          <Col span={10}>
            <Card title={`按分类统计-出账（`+financeCount.out2.length+`）`}>
              {financeCount.out2.map((item)=>(<p><span>{item.name}</span>:<b className="blue">{item.total.toFixed(2)} 元</b></p>))}
            </Card>
          </Col>
          <Col span={1}/>
        </Row>
      </div>
    </div>
  );
}

export default connect(({ loading, financeCount }) => ({ loading, financeCount }))(FinanceCount);
