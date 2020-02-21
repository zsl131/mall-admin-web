import React from 'react';
import { Button, Col, Icon, InputNumber, Row, Tooltip } from 'antd';
import styles from './specs.css';

class ListSpecs extends React.Component {

  state = {
    addVisible: false,
    updateVisible: false,
    category:{},
    curRate:'',
    item:{},
    product:{},
    specs:{},
    level:{},
    thisRate: '', //本级提成
    leaderRate: '', //上级提成
  };

  render() {
    const {
      specsList,
      levelList,
      product,
      rateList,
      addOrUpdate,
    } = this.props;

    const {curRate} = this.state;

    const html = () => {
      const span = parseInt((24/(levelList.length+1))+"");
      return (
        <div className={styles.specsMain}>
          <Row className={styles.specsRowHeader}>
            <Col span={span} className={styles.specsCol}>
              规格/等级
            </Col>
            {
              levelList.map((item)=> {
                return (
                  <Col key={"level_"+item.id} span={span} className={styles.specsCol}>
                    {item.name}
                  </Col>
                )
              })
            }
          </Row>

          {
            specsList.map((specs)=> {
              return (
                <Row key={"specs_"+specs.id} className={styles.specsRow}>
                  <Col span={span} className={styles.specsCol}>
                    {specs.name}
                  </Col>
                  {
                    levelList.map((level)=> {
                      const singleKey = specs.id+"_"+level.id;
                      const rateVal = getRate(specs.id, level.id);
                      return (
                        <Col key={"level_"+level.id} span={span} className={styles.specsCol}>
                          <span className={styles.singleField}>
                            {curRate===singleKey && <div>
                              <Tooltip title="当级提成标准"><InputNumber defaultValue={rateVal.thisRate} onBlur={(e)=>onChangeAmount(e, 'thisRate')} placeholder="提成标准"/></Tooltip>
                              <Tooltip title="上级提成标准"><InputNumber defaultValue={rateVal.leaderRate} onBlur={(e)=>onChangeAmount(e, 'leaderRate')} placeholder="提成标准"/></Tooltip>
                              <p><Button type="primary" shape="circle" onClick={()=>saveChangeAmount()} icon="check"/></p>
                            </div>}
                            {curRate!==singleKey && <div>
                              <Tooltip title="当级提成标准"><b className={rateVal.thisRate?styles.rateAmount:styles.noRateAmount}>{rateVal.thisRate?rateVal.thisRate:"当级未设"}</b></Tooltip>
                              <Tooltip title="上级提成标准"><b className={rateVal.leaderRate?styles.rateAmount:styles.noRateAmount}>{rateVal.leaderRate?rateVal.leaderRate:"上级未设"}</b></Tooltip>
                              <Icon onClick={()=>onModify(product, specs, level, rateVal)} type="edit"/>
                            </div>}
                          </span>
                        </Col>
                      )
                    })
                  }
                </Row>
              )
            })
          }

        </div>
      );
    };

    const getRate = (specsId, levelId) => {
      let val = {};
      rateList.map((item)=> {
        if(item.specsId===specsId && item.levelId===levelId) {val = {thisRate: item.amount, leaderRate: item.leaderAmount};}
        return item;
      });
      return val;
    };

    const onChangeAmount = (e, key) => {
      console.log(key)
      const amount = parseFloat(e.target.defaultValue);
      /*
      //console.log(amount);
      if(isNaN(amount) || amount<=0) {message.warn("请输入提成金额"); return;}
      const {product, specs, level} = this.state;
      const obj = {amount: amount, proId: product.id, proTitle: product.title, specsId: specs.id, specsName: specs.name, levelId: level.id, levelName: level.name};

      // console.log(obj)
      addOrUpdate(obj);
      onModify({}, {}, {}); //清空*/
      if("thisRate"===key) {
        this.setState({thisRate: amount});
      } else {
        this.setState({leaderRate: amount});
      }
    };

    const saveChangeAmount = () => {
      const {product, specs, level, thisRate, leaderRate} = this.state;
      const obj = {amount: thisRate, leaderAmount: leaderRate, proId: product.id, proTitle: product.title, specsId: specs.id, specsName: specs.name, levelId: level.id, levelName: level.name};

      // console.log(obj);
      addOrUpdate(obj);
      onModify({}, {}, {});
    };

    const onModify = (product, specs, level, rateVal) => {
      // console.log(product)
      this.setState({product:product, specs: specs, level: level, curRate: specs.id+"_"+level.id});
      if(rateVal) {
        this.setState({thisRate: rateVal.thisRate, leaderRate: rateVal.leaderRate})
      }
    };

    return(
      <div>
        <div className="listHeader">
          <h3><Icon type="bars"/> 代理提成标准<b> [<span className="red">{product?product.title:"未选择"}</span>]</b></h3>
        </div>
        <div className="listContent">
          {html()}
        </div>

      </div>
    );
  }
}

export default ListSpecs;

