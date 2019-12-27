import React from 'react';
import { Affix, Col, Icon, Layout, Modal, Popover, Row, Tooltip } from 'antd';
import router from 'umi/router';
import styles from '../index.css';
import { Link } from 'react-router-dom';
import configApi from '@/utils/configApi';
import { logout } from '@/utils/common';

const { Header } = Layout;
export default class AdminHeader extends React.Component {

  state = {
    loginUser:[]
  };

  componentDidMount() {
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    this.setState({loginUser: loginUser || []});
  }

  /*UNSAFE_componentWillMount() {
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    this.setState({loginUser: loginUser || []});
  }*/

  render() {

    const {loginUser} = this.state;

    const onLogout = () => {
      Modal.confirm({
        title: "系统提示",
        content: `确定要退出登陆吗？【${loginUser.nickname}】`,
        okText: "确定退出",
        cancelText: "点错了",
        onOk: ()=> {
          logout();
          router.push(configApi.url.login);
        }
      });
    };

    const content = (
      <div>
        <p><Link to="/admin/basic/users/updatePwd"><Icon type="setting"/> 用户配置</Link></p>
        <p onClick={() => onLogout()}><Icon type="logout"/> 退出登陆</p>
      </div>
    );

    const props = this.props;
    const collapsed = props.collapsed;
    return (
      <div className={styles.adminHeaderDiv}>
        <Affix offsetTop={0}>
          <Header className={styles.adminHeader}>
            <Row className={styles.adminHeaderRow}>
              <Col span={20} className={styles.adminHeaderCol}>
                <Tooltip title={collapsed?"点击展开侧边导航":"点击收起侧边导航"} placement="right" style={{"border":"1px red solid"}}>

                </Tooltip>
                <Icon
                  className={styles.trigger}
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={props.onCollapse}
                />
              </Col>
              <Col span={4} className={styles.adminHeaderCol} style={{"textAlign": "right", "paddingRight":"20px"}}>
                <Popover placement="bottomRight" content={content} trigger="hover">
                  <Icon type="user"/> {this.state.loginUser.nickname}
                </Popover>
              </Col>
            </Row>
          </Header>
        </Affix>
      </div>
    )
  }
}
