import React from 'react';
import { Button, Pagination, Tooltip } from 'antd';
import styles from './list.css';

const List = ({
  onExpress,
  onPageChange,
  totalElement,
  dataSource,
}) => {

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const SingleCard = (item)=> {
    const orders = item.orders;
    const productList = item.productList;
    return <div className={styles.singleDiv}>
      <div className={styles.titleDiv}>
        <div>
          <b className={styles.createDate}>{orders.createDay}</b>
          <span className={styles.ordersNo}>订单号：{orders.ordersNo}</span>
        </div>
        <div className={styles.customer}>
          <Tooltip title="消费者信息">
          <img src={orders.headImgUrl} alt={orders.nickname}/>
          <span>{orders.nickname}</span>
          </Tooltip>
        </div>
        <div className={styles.agentInfo}>
          <Tooltip title="代理人信息">
            {orders.agentName?<span>{orders.agentName}[{orders.agentPhone}]</span>:"无代理人"}
          </Tooltip>
        </div>
      </div>

      <div className={styles.productList}>
        {productList.map((pro)=> {return SingleProduct(pro)})}
      </div>

      <div className={styles.dateDiv}>
        <div>
        <span>下单时间：{orders.createTime}</span>
        <span>付款时间：{orders.payTime?orders.payTime:<b className="red">未付款</b>}</span>
        </div>
        {orders.remark?<div className={styles.ordersRemark}>买家备注：{orders.remark}</div>:""}
      </div>

      <div className={styles.customerDiv}>
        <span>收货地址：{orders.addressCon}</span>
      </div>

      <div className={styles.moneyDiv}>
        <div className={styles.ordersOptsDiv}>
          {orders.status==='1' && <Button type="primary" onClick={()=>onExpress(orders)}>发货</Button>}
          {orders.status==='2' && <span>已发货</span>}
          {orders.status==='3' && <span>已完成</span>}
          {orders.status==='0' && <span className="dark">待付款</span>}
          {orders.status==='-1' && <span className="red">已取消</span>}
          {orders.status==='-2' && <span className="red">整单退款</span>}
          {orders.status==='-10' && <span className="red">已删除</span>}
        </div>
        <div className={styles.moneyDivCon}>
          <span>订单总额：<b>￥ {orders.totalMoney}</b></span>
          <span>公益基金：<b>￥ {orders.fundMoney?orders.fundMoney:0}</b></span>
          <span>优惠金额：<b>￥ {orders.discountMoney?orders.discountMoney:0}</b></span>
        </div>
      </div>
    </div>
  };

  const SingleProduct = (item)=> {
    return (
      <div className={styles.singleProduct}>
        <div className={styles.proImg}><img src={item.proImg} alt={item.proTitle}/></div>
        <div className={styles.proContent}>
          <p className={styles.proTitle}>{item.proTitle}</p><p className={styles.specsName}>规格：{item.specsName}</p>
        </div>
        <div className={styles.proInfo}>
          <p className={styles.oriPrice}>￥ {item.oriPrice}</p>
          <p className={styles.price}>￥ {item.price}</p>
        </div>
        <div className={styles.amount}><p>数量：<b>{item.amount}</b></p>
          <p>{item.saleMode==='1'?<Tooltip title="现发产品"><span className="blue">现发</span></Tooltip>:
            <Tooltip title="预售产品"><span className="red">预计发货：{item.deliveryDate}</span></Tooltip>}</p>
        </div>
        <div className={styles.proOperator}>
          -
        </div>
      </div>
    )
  };

  return (
    <div>
      {/*<Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>*/}
      {dataSource.map((item)=> {
        return SingleCard(item)
      })}
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    </div>
  );
};

export default List;
