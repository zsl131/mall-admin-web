import React from 'react';
import { Button, Empty } from 'antd';

import styles from './404.css';
import Helmet from 'react-helmet';

export default class PageNotFound extends React.Component {

  render() {
    return (
      <div className={styles.main404}>
        <Helmet><title>页面走丢了</title></Helmet>
        <h1>404</h1>
        <Empty
          description="您访问的页面走丢了"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
          <p>URL:{this.props.location.pathname}</p>
        <Button icon="rollback" onClick={()=>{window.history.back()}}>返回上一级</Button>
      </div>
    );
  }
}
