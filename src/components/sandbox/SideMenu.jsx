import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";

import { routers } from "../../router";
import styles from "./SideMenu.module.css";
import siteBaseConfig from "../../config";
import { fetchGetMenus } from "../../utils/api";
import { iconList } from "./iconList";
 import { reactLocalStorage } from "reactjs-localstorage";

import { DesktopOutlined } from "@ant-design/icons"; 

import { connect } from "react-redux";

const { Sider } = Layout;

function AppLayout(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isInit, setIsInit] = useState(false); 

  // items 菜单内容	ItemType[]
  const [items, setitems] = useState([]);
  // defaultSelectedKeys 初始选中的菜单项 key 数组
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  // defaultOpenKeys 初始展开的 SubMenu 菜单项 key 数组
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);
  // submenu keys of first level
  const [rootSubmenuKeys, setrootSubmenuKeys] = useState([]);
  // openKeys 当前展开的 SubMenu 菜单项 key 数组
  const [openKeys, setOpenKeys] = useState([]);

  // 获取用户权限列表
  const {
    role: { rights },
  } = JSON.parse(window.localStorage.getItem('token')) 
  
  // JSON.parse(window.localStorage.getItem('token'))  // reactLocalStorage.getObject("token");
 

  const checkPagePermission = (item) => {
    return (
      item.key !== "/login" &&
      rights.includes(item.key) &&
      item.pagepermisson === 1
    );
  };

  useEffect(() => {
    async function fetchData() {
      const menusListData = await fetchGetMenus();
      let tempItems = [],
        rootSubmenuKeys = []; // submenu keys of first level
      menusListData.forEach((item) => {
        item.key !== "/login" && rootSubmenuKeys.push(item.key);
        checkPagePermission(item) &&
          tempItems.push({
            label: item.title,
            key: item.key,
            icon: iconList[item.key],
            children:
              item.children &&
              item.children.length > 0 &&
              item.children.map((child) => {
                if (child.pagepermisson === 1) {
                  return {
                    label: child.title,
                    key: child.key,
                    icon: iconList[item.key],
                    children:
                      child.children &&
                      child.children.length > 0 &&
                      child.children.map((sun) => {
                        if (child.pagepermisson === 1) {
                          return {
                            label: sun.title,
                            key: sun.key,
                            icon: iconList[item.key],
                          };
                        }
                      }),
                  };
                }
              }),
          });
      });

      setitems(tempItems);
      setrootSubmenuKeys(rootSubmenuKeys);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const routes = matchRoutes(routers, location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
    const pathArr = [];
    if (routes !== null) {
      routes.forEach((item) => {
        const path = item.pathname;
        if (path) {
          pathArr.push(path);
        }
      });
    }
    setDefaultSelectedKeys(pathArr);
    setDefaultOpenKeys(pathArr);
    setIsInit(true);
  }, [location.pathname]);

  if (!isInit) {
    return null;
  }

  const onClick = (e) => {
    navigate(e.key);
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return ( 
      <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
        <div className={styles.logo}> {
          !props.isCollapsed ?  
          <div> <DesktopOutlined style={{marginRight: '10px'}}/> {siteBaseConfig.siteName}</div> : <DesktopOutlined />
          } </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys} //  初始选中的菜单项 key 数组  string[]
          defaultOpenKeys={defaultOpenKeys} // 初始展开的 SubMenu 菜单项 key 数组
          openKeys={openKeys} // openKeys  当前展开的 SubMenu 菜单项 key 数组
          onOpenChange={onOpenChange} //onOpenChange SubMenu 展开/关闭的回调
          onClick={onClick}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={items}
        ></Menu>
      </Sider> 
  );
}

const mapStateToProps = (state, ownProps) => { 
  return {
    isCollapsed: state.SidebarCollapsedReducers.isCollapsed
  }
} 

export default connect(mapStateToProps)(AppLayout);
