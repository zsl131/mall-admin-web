import React from 'react';
import { Button, Modal } from 'antd';
import styles from './list.css';

class RelationModal extends React.Component {

  render() {
    const {
      onOk,
      type,
      item,
      setRelation,
      ...modalProps
    } = this.props;

    //console.log(type)

    const handleOk = (e) => {
      e.preventDefault();
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const handleClick =(type)=> {
      setRelation({id:item.id, type:type});
    };

    return(
      <Modal {...modalOpts} >
        <span className={styles.singleBtn}><Button onClick={()=>handleClick('0')} type={type==='0'?'primary':"default"}>不可上传</Button></span>
        <span className={styles.singleBtn}><Button onClick={()=>handleClick('1')} type={type==='1'?'primary':"default"}>可上传，但需审核</Button></span>
        <span className={styles.singleBtn}><Button onClick={()=>handleClick('2')} type={type==='2'?'primary':"default"}>可上传，无需审核</Button></span>
      </Modal>
    );
  }
}

export default RelationModal;

