import React from "react";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Avatar, Card } from "antd";
 import { reactLocalStorage } from "reactjs-localstorage";

const { Meta } = Card;

export default function PersonalCard(props) {
  // 获取用户权限列表
  const {
    role: { roleName },
    region,
    username,
  } = JSON.parse(window.localStorage.getItem('token'))  // reactLocalStorage.getObject("token");

  const showDrawer = ()=>{
    console.log(props.showDrawerValue)
    props.showDrawerHandel(!props.showDrawerValue)
  }

  return (
    <div>
      <Card
        style={{
          width: "100%",
          height: props.height,
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" onClick={showDrawer}/>,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title={username}
          description={
            <div>
              <span>{region ? region : "总部"}</span> --
              <span>{roleName}</span>
            </div>
          }
        />
      </Card>
    </div>
  );
}
