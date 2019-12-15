import React from 'react';
import { Col, Icon, Layout, Popconfirm, Popover, Row, Tooltip } from 'antd';
import router from 'umi/router';
import styles from '../index.css';
import { Link } from 'react-router-dom';

const { Header } = Layout;
export default class AdminHeader extends React.Component {

  state = {
    loginUser:[]
  };

  UNSAFE_componentWillMount() {
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    this.setState({loginUser: loginUser || []});
  }

  render() {

    const confirmOpts = {
      title: '确定退出登陆吗？',
      okText: '确定退出',
      cancelText: '取消操作',
      onConfirm: () => {
        sessionStorage.clear();
        localStorage.clear();
        router.push("/login");
      }
    };

    const content = (
      <div>
        <p><Link to="/admin/users/updatePwd"><Icon type="setting"/> 用户配置</Link></p>
        {/*<Divider></Divider>*/}
        <p><Popconfirm {...confirmOpts}><Icon type="logout"/> 退出登陆</Popconfirm></p>
      </div>
    );

    const props = this.props;
    const collapsed = props.collapsed;
    return (
      <div>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Row>
            <Col span={20}>
              <Tooltip title={collapsed?"点击展开侧边导航":"点击收起侧边导航"} placement="right">
                <Icon
                  className={styles.trigger}
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={props.onCollapse}
                />
              </Tooltip>
            </Col>
            <Col span={4} style={{"textAlign": "right", "paddingRight":"20px"}}>
              <Popover placement="bottomRight" content={content} trigger="hover">
                <Icon type="user"/> {this.state.loginUser.nickname}
              </Popover>
            </Col>
          </Row>
        </Header>
      </div>
    )
  }
}
