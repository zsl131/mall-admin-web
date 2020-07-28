import React from 'react';
import { Modal } from 'antd';
import styles from './edit.css';


export default class ShowDetailModal extends React.Component {

  state = {
    detail: this.props.detailList,
    record: this.props.record,
    ticketList: this.props.ticketList,
    chineseMoney: this.props.chineseMoney,
  };


  render() {
    const {
      ...modalProps
    } = this.props;

    const {
      detail,record,ticketList,chineseMoney
    } = this.state;

    const modalOpts = {
      ...modalProps,
    };

    const dataTr = ()=> {
      return detail.map((item)=>{
        return (
          <tr>
            <td>{item.recordDate}</td>
            <td>{item.title}</td>
            <td>{item.cateName}</td>
            <td>{item.handleName}</td>
            <td>{item.price}</td>
            <td>{item.count}</td>
            <td>{item.amount}</td>
            <td>{item.ticketCount}</td>
          </tr>
        )
      })
    };

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        <table className={styles.mytable}>
          <thead>
          <tr>
            <td colSpan={8}>
              <b>{record.flag==='-1'?"费用报销单":"收益入账单"}</b>（{record.status==='0'?"待审":(record.status==='1'?<span className="blue">已通过</span>:<span className="red">已作废</span>)}）
              <span style={{"float":"right","paddingRight":"10px"}}>编号：{record.ticketNo}号</span>
            </td>
          </tr>
          <tr>
            <td colSpan={8} style={{"textAlign":"right","paddingRight":"10px"}}>{record.createTime}</td>
          </tr>
          <tr>
            <td>日期</td>
            <td>摘要（简要说明）</td>
            <td>会计科目</td>
            <td>经办人</td>
            <td>单价（元）</td>
            <td>数量</td>
            <td>金额（元）</td>
            <td>附单（张）</td>
          </tr>
          </thead>
          <tbody>
          {dataTr()}
          <tr>
            <td>合计：</td>
            <td colSpan={5} style={{"textAlign":"left"}}>（大写）：<b>{chineseMoney}</b></td>
            <td>{record.amount}</td>
            <td>{record.ticketCount}</td>
          </tr>
          <tr>
            <td colSpan={2} className={styles.left}>
              登记人：{record.operator}
            </td>
            <td colSpan={4} className={styles.left}>
              审核人：{record.verifyName?<p><span>{record.verifyName}</span><span>{record.verifyTime}</span></p>:<span className="red">未审核</span>}
            </td>
            <td colSpan={2} className={styles.left}>
              主管：
            </td>
          </tr>
          <tr>
            <td colSpan={8}>
              {ticketList.map((item)=> {
                return (
                  <a href={item.picUrl} target="_blank" rel="noopener noreferrer"><img  alt="图片" src={item.picUrl} className={styles.img}/></a>
                )
              })}
            </td>
          </tr>
          </tbody>
        </table>
      </Modal>
    );
  }
}
