import React, { useEffect, useRef, useState } from "react";
import { Button, message, notification, Space } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import NewsSummary from "./components/NewsSummaryAddForm";

import { fetchPatchtNewsDetail, fetchGetNewsDetail } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
 import { reactLocalStorage } from "reactjs-localstorage";

export default function Update() {
  const params = useParams();
  let id = params.id;

  const NewsForm = useRef(null);
  const [newsInfo, setnewsInfo] = useState("");
  const [newsContent, setnewsContent] = useState("");

  const [NewsDetailData, setNewsDetailData] = useState(null);
  const fetchData = async () => {
    let params = {
      id: id,
    };
    const getNewsDetailData = await fetchGetNewsDetail(params);
    setNewsDetailData(getNewsDetailData[0]); 
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      ...newsInfo,
      content: content,
      auditState: auditState, // 0 - 草稿箱 ；  1 - 待审核 ；  2 - 审核通过 ；  3 - 审核驳回 ；
    };

    const AdNewsState = await fetchPatchtNewsDetail(id, obj);

    console.log(AdNewsState);

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
      <h3> 更新站内信 </h3>
      <div
        style={{
          margin: "20px 0 0",
        }}
        className="container-wrapper"
      >
      {!!NewsDetailData &&  <NewsSummary
          onCreateNewsFinish={createNewsFinish}
          ref={NewsForm}
          newsContentData={NewsDetailData}
        ></NewsSummary>} 
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
