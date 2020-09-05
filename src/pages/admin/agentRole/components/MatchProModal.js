import React from 'react';
import { Modal } from 'antd';

class MatchProModal extends React.Component {


  render() {
    const {
      onOk,
      ...modalProps
    } = this.props;

    const handleOk = (e) => {
      e.preventDefault();
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };


    return(
      <Modal {...modalOpts} style={{"minWidth":"80%", "top":"20px"}}>
        ---
      </Modal>
    );
  }
}

export default MatchProModal;

