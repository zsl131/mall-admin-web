import React from 'react';
import { Input, InputNumber, message, Modal, Tooltip } from 'antd';

class AfterSaleModal extends React.Component {

  state = {
    money:0,
    reason: '',
  };

  componentDidMount() {
  }

  render() {
    const {
      onOk,
      orders,
      ordersProduct,
      ...modalProps
    } = this.props;

    //console.log(ordersProduct)

    //实际金额
    const realMoney = orders.totalMoney - (orders.discountMoney?orders.discountMoney:0) - orders.backMoney;
    //console.log(realMoney)
    //总金额
    const totalMoney = ordersProduct.price*ordersProduct.amount;
    const backMoney = ordersProduct.backMoney?ordersProduct.backMoney:0; //已退金额

    let maxBackMoney = (realMoney>(totalMoney-backMoney))?(totalMoney-backMoney):realMoney;

    const handleOk = (e) => {
      e.preventDefault();
      const money = this.state.money;
      const reason = this.state.reason;

      if(money<=0 || money>(maxBackMoney)) {
        message.error("退款金额不能小于0，也不能大于最大退款总额【"+maxBackMoney+"】")
      } else if(!reason) {
        message.error("请输入退款原因");
      } else {
        onOk({ordersProId: ordersProduct.id, money: money, reason: reason})
      }
      //console.log(money)
    };

    const changeMoney = (value) => {
      //console.log(value)
      let money = parseFloat(value);
      this.setState({money: money});
    };

    const onChangeReason = (e) => {
      // console.log(e.target.value)
      let value = '';
      value = e.target.value;
      this.setState({reason: value});
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    return(
      <Modal {...modalOpts}>
        <div>
          <p>产品名称：{ordersProduct.proTitle}</p>
          <p>产品金额：<Tooltip title={"单价"}><b>{ordersProduct.price}</b></Tooltip>*<Tooltip title={"数量"}><b>{ordersProduct.amount}</b></Tooltip>=
            <Tooltip title={"单品总价｜最多退款金额"}><b className="red">{totalMoney}</b></Tooltip>
          </p>
          <p>实收金额：<Tooltip title={"实收金额，退款金额不能超过此金额"}><b>{realMoney} 元</b></Tooltip></p>
          <p>已退金额：<Tooltip title={"已退金额"}><b>{backMoney} 元</b></Tooltip></p>
          <p>
            <Tooltip title={"输入退款金额"}>
            <InputNumber onChange={changeMoney} placeholder={"输入退款金额,不能超过 "+(maxBackMoney)+" 元"} style={{"width":"100%"}}/>
            </Tooltip>
          </p>
          <p>
            <Tooltip title={"输入退款原因"}>
              <Input onChange={onChangeReason} placeholder={"输入退款原因"} style={{"width":"100%"}}/>
            </Tooltip>
          </p>
          <p className="red">
            此操作会直接退款到客户，请谨慎操作！！
          </p>
        </div>
      </Modal>
    );
  }
}

export default AfterSaleModal;
