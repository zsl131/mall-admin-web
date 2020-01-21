import React from 'react';
import { Col, Icon, InputNumber, message, Row } from 'antd';
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
    level:{}
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
                            {curRate===singleKey && <span><InputNumber defaultValue={rateVal} onBlur={(e)=>onChangeAmount(e)} placeholder="提成标准"/></span>}
                            {curRate!==singleKey && <span><b className={rateVal?styles.rateAmount:styles.noRateAmount}>{rateVal?rateVal:"未设置"}</b><Icon onClick={()=>onModify(product, specs, level)} type="edit"/></span>}
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
      let val = "";
      rateList.map((item)=> {
        if(item.specsId===specsId && item.levelId===levelId) {val = item.amount;}
        return item;
      });
      return val;
    };

    const onChangeAmount = (e) => {
      const amount = parseFloat(e.target.defaultValue);
      //console.log(amount);
      if(isNaN(amount) || amount<=0) {message.warn("请输入提成金额"); return;}
      const {product, specs, level} = this.state;
      const obj = {amount: amount, proId: product.id, proTitle: product.title, specsId: specs.id, specsName: specs.name, levelId: level.id, levelName: level.name};

      // console.log(obj)
      addOrUpdate(obj);
      onModify({}, {}, {}); //清空
    };

    const onModify = (product, specs, level) => {
      // console.log(product)
      this.setState({product:product, specs: specs, level: level, curRate: specs.id+"_"+level.id});
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

