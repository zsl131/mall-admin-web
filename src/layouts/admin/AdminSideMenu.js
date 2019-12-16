import React from 'react';
import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

import styles from '../index.css';
import { getAppConfigObj } from '@/utils/InitSystemUtils';
import MyIcon from '@/components/common/MyIcon';
import Helmet from 'react-helmet';
import router from 'umi/router';
import configApi from '@/utils/configApi';

const SubMenu = Menu.SubMenu;

class AdminSideMenu extends React.Component {
  state = {
    collapsed: false,
    defaultKey: sessionStorage.getItem("menuKey") || '1',
    openKey: sessionStorage.getItem("openKey") || "",
  };

  handlerClick = ({item, key, keyPath}) => {
   // console.info(item, keyPath);
    sessionStorage.setItem("menuKey", key+"");
    sessionStorage.setItem("openKey", keyPath[1]+"");
    this.setState({defaultKey: key, openKey: keyPath[1]+""});
  };

  render() {

    //console.log("->"+this.state.openKey, "->"+this.state.defaultKey);

    const navMenus = JSON.parse(sessionStorage.getItem("navMenus"));

    const appConfig = getAppConfigObj();
    //console.log(appConfig);
    if(!appConfig) {
      //router.push(configApi.url.login); //此处开启会导致/login和/admin/index死循环
    }

    const menus = navMenus!==null?navMenus.map((item) => {
      return (
        <SubMenu key={item.menu.id} title={<span><Icon type={item.menu.icon || "appstore"} /><span>{item.menu.name}</span></span>}>
          {
            item.children.map((subMenu) => {
              return (<Menu.Item key={subMenu.id}><Link to={subMenu.href}>{subMenu.name}</Link></Menu.Item>)
            })
          }
        </SubMenu>
      );
    }):"";

    const collapsed = this.props.collapsed;

    const icons = ["icon-coffee", "icon-coffeepot", "icon-candy", "icon-salesign", "icon-mountains", "icon-beachbar",
                  "icon-compass", "icon-backpack", "icon-sheriffsbadge", "icon-wheel", "icon-saloon", "icon-lifebuoy",
                  "icon-helm", "icon-captain", "icon-cannon", "icon-boots", "icon-barrel", "icon-bandit"];

    const getRandomIcon = () => {
      const index = parseInt(Math.random()*icons.length);
      return icons[index];
    };
    return (
      <div>
        <Helmet><title>{appConfig?appConfig.appName:"未登陆"} - 后台管理</title></Helmet>
        <div className={styles.logoDiv}>
          <div className={styles.logo}><h3>{collapsed?<MyIcon type={getRandomIcon()}/>:(appConfig?appConfig.appName:"未登陆")}</h3></div>
        </div>
        <Menu
          defaultSelectedKeys={[this.state.defaultKey]}
          defaultOpenKeys={[this.state.openKey]}
          mode="inline"
          theme="dark"
          collapsed="{collapsed}"
          onClick={this.handlerClick.bind(this)}
        >
          {menus}
        </Menu>
      </div>
    );
  }
}

export default AdminSideMenu;
