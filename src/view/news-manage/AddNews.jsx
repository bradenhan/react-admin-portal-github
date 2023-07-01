import React, { useRef, useState } from "react";
import { Button, message, notification, Space } from "antd";
import { SmileOutlined } from '@ant-design/icons';
import NewsSummary from "./components/NewsSummaryAddForm";

import { fetchAdNewsSave } from "../../utils/api";
import { useNavigate } from "react-router-dom";
 import { reactLocalStorage } from "reactjs-localstorage";

export default function Add() {
  const NewsForm = useRef(null);
  const [newsInfo, setnewsInfo] = useState("");

  const createNewsFinish = (values) => {
    console.log(values);
    setnewsInfo(values);
  };

  const navigate = useNavigate();

  // 获取用户权限列表
  const { roleId, region, username } = JSON.parse(window.localStorage.getItem('token'))  // reactLocalStorage.getObject("token");

  const saveToNews = async (auditState) => {
    const { title, categoryId, content } = newsInfo;
    var obj = {
      title: title,
      categoryId: categoryId,
      content: content,
      region: region ? region : "总部",
      author: username,
      roleId: roleId,
      auditState: auditState, // 0 - 草稿箱 ；  1 - 待审核 ；  2 - 审核通过 ；  3 - 审核驳回 ；
      publishState: 0,
      createTime: Date.now(),
      star: 0,
      view: 0,
      publishTime: 0,
    };

    const AdNewsState = await fetchAdNewsSave(obj);

    notification.open({
      message: "通知",
      description: `您可以到${
        auditState === 0 ? "草稿箱" : "审核列表"
      }中查看您的站内信`,
      onClick: () => {
        console.log("Notification Clicked!");
      },
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });

    setTimeout(() => {
      navigate("/news-manage/draft");
    }, 200);
  };

  return (
    <div>
      <h3> 撰写站内信 </h3>
      <div
        style={{
          margin: "20px 0 0",
        }}
        className="container-wrapper"
      >
        <NewsSummary
          onCreateNewsFinish={createNewsFinish}
          ref={NewsForm}
        ></NewsSummary>{" "}
      </div>
      <div
        style={{
          margin: "-32px 0 0",
          padding: "0 0 0 250px",
          textAlign: "center",
        }}
      >
        <Space>
          <Button
            type="primary"
            disabled={!!newsInfo ? false : true}
            onClick={() => saveToNews(0)}
          >
            保存草稿{" "}
          </Button>{" "}
          <Button
            type="primary"
            danger
            disabled={!!newsInfo ? false : true}
            onClick={() => saveToNews(1)}
          >
            提交审核{" "}
          </Button>{" "}
        </Space>{" "}
      </div>{" "}
    </div>
  );
}
