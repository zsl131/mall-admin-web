import React from 'react';
import { Modal } from 'antd';
import styles from './list.css';


class ListPaper extends React.Component {

  render() {
    const {
      paperList,
      ...modalProps
    } = this.props;

    const modalOpts = {
      ...modalProps,
    };

    return(
      <Modal {...modalOpts} >
        {paperList.map((item)=> {
          return (
            <a className={styles.singleHref} key={item.id} href={item.filePath} target="_blank" rel="noopener noreferrer"><img src={item.filePath} alt={item.fileName} className={styles.avatarImg}/>
              <p>{item.fileName}</p>
            </a>
          )
        })}
      </Modal>
    );
  }
}

export default ListPaper;

