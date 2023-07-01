import React,   { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

 import { reactLocalStorage } from "reactjs-localstorage";

import { Space, Table , Button, notification } from "antd";

import { SmileOutlined } from "@ant-design/icons"; 

import {
  fetchGetUnAuditNewsList,
  fetchCheckPatchtNews,
} from "../../../utils/api";

export default function AuditNews() {
  const [dataSource, setdataSource] = useState([]);

  // 获取用户权限列表
  const { roleId, region, username } = JSON.parse(window.localStorage.getItem('token'))  // reactLocalStorage.getObject("token");

  const roleInterface = {
    1: "superadmin",
    2: "regionadmin",
    3: "regionediter",
  };

  useEffect(() => {
    const fetchData = async () => {
      let params = {
        auditState: 1, // 0 - 草稿箱 ；  1 - 待审核 ；  2 - 审核通过 ；  3 - 审核驳回 ；
      };
      const newsListData = await fetchGetUnAuditNewsList(params);

      // 注意此处
      setdataSource(
        roleInterface[roleId] === "superadmin"
          ? newsListData
          : [
              ...newsListData.filter((item) => item.author === username),
              ...newsListData.filter(
                (item) =>
                  item.region === region &&
                  roleInterface[item.roleId] === "regionediter"
              ),
            ]
      );
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const goToDetail = (item) => {
    console.log(item);
    setTimeout(() => {
      navigate(`/news-manage/preview/${item.id}`);
    }, 200);
  };

  // 通过
  const auditHandel = async (id, type) => {
    console.log(id);
    let params = {};

    if (type === "pass") {
      params.auditState = 2;
      params.publishState = 1;
    } else if (type === "reject") {
      params.auditState = 3;
      params.publishState = 0;
    }

    setdataSource(dataSource.filter((data) => data.id !== id));
    const res = await fetchCheckPatchtNews(id, params);
    if (!!res) {
      notification.open({
        message: "通知",
        description: `您可以到 草稿箱 中查看您的站内信`,
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
    }
  };

  // 驳回
  const publishHandel = async (id) => {
    console.log(id);
    setdataSource(dataSource.filter((data) => data.id !== id));
    const res = await fetchCheckPatchtNews(id, {
      publishState: 2,
    });
    if (!!res) {
      notification.open({
        message: "通知",
        description: `您可以到 【发布管理/已发布】 中查看您的站内信`,
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
        navigate(`/publish-manage/published`);
      }, 200);
    }
  };

  const columns = [
    {
      title: "站内信标题",
      dataIndex: "title",
      render: (title, item) => {
        return (
          <Button type="link" color="magenta" onClick={() => goToDetail(item)}>
            {" "}
            {title}{" "}
          </Button>
        );
      },
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "分类",
      dataIndex: "category",
      render: (category) => {
        return <span> {category.title} </span>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        // item
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => auditHandel(item.id, "pass")}
            >
              通过{" "}
            </Button>{" "}
            <Button
              size="small"
              danger
              onClick={() => auditHandel(item.id, "reject")}
            >
              驳回{" "}
            </Button>{" "}
          </Space>
        );
      },
    },
  ];

  return (
    <div> 
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(item) => item.id}
      />
    </div>
  );
}
