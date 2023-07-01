import React,{ useEffect, useState } from 'react';
import SideMenu from "../components/sandbox/SideMenu";
import TopHeader from "../components/sandbox/TopHeader";

import { Layout, theme } from "antd";

import { Link, matchRoutes, Outlet, useLocation } from "react-router-dom";
import { routers } from '../router';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'; 

const { Content } = Layout;

export default function LayoutIndex() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);
  const [isInit, setIsInit] = useState(false) 
  NProgress.start();
  NProgress.configure({ easing: 'ease', speed: 1000 });

  useEffect(() => {
    setTimeout(() => { 
      NProgress.done();
    }, 200);
  }, [])

  const [currentPageTitle, setcurrentPageTitle] = useState("");

  useEffect(() => { 
    const routes = matchRoutes(routers, location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
    const pathArr = [];
    if(routes !== null) {
      routes.forEach((item) => {
      const path = item.route.path;
        if(path) {
          pathArr.push(path);
        }
      })
    }
    setDefaultSelectedKeys(pathArr);
    setDefaultOpenKeys(pathArr);
    setIsInit(true);

 let current = routes.filter((item) => {
      return item.pathname === location.pathname;
    });
    setcurrentPageTitle(current[0].route.label);
  }, [location.pathname]);

  if(!isInit) {
    return null;
  }

  return (
    <div> 
      <Layout style={{ height: "100vh" }}>
        <SideMenu></SideMenu>
        <Layout className="site-layout">
          <TopHeader pageTitle = {currentPageTitle}></TopHeader>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              overflow: 'auto'
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
