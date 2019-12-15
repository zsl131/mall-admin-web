import React from 'react';
import {connect} from 'dva';

import styles from './index.css';
import BasicModel from '@/layouts/common/BasicModel';

class BasicLayout extends React.Component{
  //console.log(props);

  render() {
    const pathname = this.props.location.pathname;
    const children = this.props.children;
    //console.log(pathname)
    if(pathname === '/init') { //初始化
      return (
        <BasicModel myKey={pathname}>
          <div className={styles.normal}>
            <h1 className={styles.title}>系统需要做以下处理方可继续</h1>
            {children}
          </div>
        </BasicModel>
      );
    } else if(pathname === "/login") {
      return (
        <div>
        {children}
        </div>
      )
    } else {
      return (
        <div>
        {children}
        </div>
      )
    }
  }

}

export default connect()(BasicLayout);
