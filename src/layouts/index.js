import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Layout } from 'antd';
import styles from './index.css';
import BasicModel from '@/layouts/common/BasicModel';
import AdminSideMenu from '@/layouts/admin/AdminSideMenu';
import AdminHeader from '@/layouts/admin/AdminHeader';
import configApi from '@/utils/configApi';
import { checkAuthByUrl } from '@/utils/authUtils';
import { check } from '@/utils/basicCheck';
import CopyYear from '@/components/common/CopyYear';

const { Sider, Content } = Layout;

class BasicLayout extends React.Component{
  //console.log(props);

  state = {
    collapsed: false
  };

  UNSAFE_componentWillMount() {
    const curVal = sessionStorage.getItem("curCollapsed");
    const collapsed = curVal==="1";
    this.setState({collapsed: collapsed});
  }

  render() {

    const conHeight = document.body.clientHeight;
    const minConHeight = conHeight - 64; //内容部份最小高度

    const onCollapse = () => {
      const curVal = !this.state.collapsed;
      this.setState({collapsed: curVal});
      const collapsed = curVal?"1":"0";
      sessionStorage.setItem("curCollapsed", collapsed);
    };

    const pathname = this.props.location.pathname;

    check(pathname);

    const user = JSON.parse(sessionStorage.getItem("loginUser"));
    //console.log(pathname, user);

    if ((pathname !== '/login' && pathname !== '/init') && user === null) {
      console.log("loginUser is null", user);
      router.push(configApi.url.login);
    } else if(pathname.indexOf("/admin")===0 ) { //需要进行登陆验证
      const hasAuth = checkAuthByUrl(pathname); //通过url检测权限
      if(!hasAuth) { //无权限
        //console.log("=======no auth =============="+pathname);
        //router.push("/public/noAuth");
      }
    }

    const children = this.props.children;
    //console.log(pathname)
    if(pathname === '/init' || pathname === "/404") { //初始化
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
    } else if(pathname.indexOf("/admin") === 0) {
      return (
        <div className={styles.adminMainContainer}>
          <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}
                   style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                  }}>
              <AdminSideMenu collapsed={this.state.collapsed}/>
            </Sider>
            <Layout style={{ marginLeft: (this.state.collapsed?80:200) }}>
              <AdminHeader onCollapse={onCollapse} collapsed={this.state.collapsed}/>
              <BasicModel myKey={pathname}>
                <Content
                  style={{
                    margin: '12px 8px',
                    background: '#fff',
                    minHeight: minConHeight,
                  }}
                >
                  {children}
                  <CopyYear/>
                </Content>
              </BasicModel>
            </Layout>
          </Layout>
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
