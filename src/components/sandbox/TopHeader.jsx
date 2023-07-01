import React, { useEffect, useState } from "react";
import { Layout, Avatar, theme, Dropdown, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";

import {
  MenuFoldOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import styles from "./TopHeader.module.css";

import { connect } from "react-redux";

 import { reactLocalStorage } from "reactjs-localstorage";
const { Header } = Layout;

function TopHeader(props) {  

  const {
    role: { roleName },
    username,
  } = JSON.parse(window.localStorage.getItem('token')) 
  
  // JSON.parse(window.localStorage.getItem('token'))  // reactLocalStorage.getObject("token");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: <span>{roleName}</span>,
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu
        </a>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu
        </a>
      ),
    },
    {
      key: "4",
      label: "退出",
    },
  ];

  const onClick = ({ key }) => {
    if (key.toString() === "4") {
      reactLocalStorage.clear();
      navigate("/login");
    }
  };

  const changeCollapsed = ()=>{
    // 改变state的状态
    // dispatch
    
    props.changeCollapsed() 
  }

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <div style={{ display: "flex" }}>
        {React.createElement(
          props.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: styles.trigger,
             onClick: () => changeCollapsed()
          }
        )}

        <strong>{props.pageTitle}</strong>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          欢迎{" "}
          <Tag color="magenta">
            <strong>
              {roleName} - {username}
            </strong>
          </Tag>{" "}
          回来
        </div>
        <div style={{ width: "40px", margin: "0 0 0 10px" }}>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Space>
                <Avatar size={25} icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}

const mapStateToProps = (state, ownProps) => { 
  return {
    isCollapsed: state.SidebarCollapsedReducers.isCollapsed
  }
}

const mapDispatchToProps = {
  changeCollapsed(){
    return {
      type: 'change_collapsed', 
    }
  }
} 
 

export default connect(mapStateToProps,mapDispatchToProps)(TopHeader);
