import React from 'react';
import { Modal } from 'antd';

class ShowExpressModal extends React.Component {

  componentDidMount() {
  }

  render() {
    const {
      onOk,
      orders,
      expressList,
      ...modalProps
    } = this.props;


    const handleOk = (e) => {
      e.preventDefault();
      onOk();
    };

    const modalOpts = {
      ...modalProps,
      title: "物流信息",
      onOk: handleOk
    };

    return(
      <Modal {...modalOpts}>
        {
          expressList.map((item)=> {
            return (
              <div>{item.expName}：{item.expNo}</div>
            )
          })
        }
      </Modal>
    );
  }
}

export default ShowExpressModal;
