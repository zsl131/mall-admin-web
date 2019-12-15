import React from 'react';
import { ConfigProvider } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import zhCN from 'antd/es/locale/zh_CN';

export default class BasicModel extends React.Component {

  render() {
    const props = this.props;
    return (
      <ConfigProvider locale={zhCN}>
        <TransitionGroup>
          <CSSTransition key={props.myKey} classNames="fade" timeout={300}>
            {props.children}
          </CSSTransition>
        </TransitionGroup>
      </ConfigProvider>
    );
  }
}
