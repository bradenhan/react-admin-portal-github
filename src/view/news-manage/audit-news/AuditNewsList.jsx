import React,   { useState, useEffect } from "react";
import { Space, Table, Tag, Button, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import {
  fetchGetAuditNewsList,
  fetchCheckPatchtNews,
} from "../../../utils/api";

import { useNavigate } from "react-router-dom";

 import { reactLocalStorage } from "reactjs-localstorage"; 

export default function AuditNewsList() {
  const [dataSource, setdataSource] = useState([]);

  // 获取用户权限列表
  const { username } = JSON.parse(window.localStorage.getItem('token'))  // reactLocalStorage.getObject("token");

  const fetchData = async () => {
    let params = {
      author: username,
      auditState: 0, // 0 - 草稿箱 ；  1 - 待审核 ；  2 - 审核通过 ；  3 - 审核驳回 ；
      publishState: 1, // 1 待发布
    };
    const newsListData = await fetchGetAuditNewsList(params);
    setdataSource(newsListData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const auditStateList = ["未审核", "审核中", "已通过", "未通过"];
  const colorStateList = ["blcak", "orange", "green", "red"];

  const navigate = useNavigate();
  const goToDetail = (item) => {
    console.log(item);
    setTimeout(() => {
      navigate(`/news-manage/preview/${item.id}`);
    }, 200);
  };

  // 审核
  const checkHandel = async (id) => {
    console.log(id);
    const res = await fetchCheckPatchtNews(id, { auditState: 1 });
    if (!!res) {
      notification.open({
        message: "通知",
        description: `您可以到 审核列表 中查看您的站内信`,
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
        navigate(`audit-news-manage/audit`);
      }, 200);
    }
  };

  // 撤销
  const revertHandel = async (id) => {
    console.log(id);
    setdataSource(dataSource.filter((data) => data.id !== id));
    const res = await fetchCheckPatchtNews(id, { auditState: 0 });
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

  // 发布
  const publishHandel = async (id) => {
    console.log(id);
    setdataSource(dataSource.filter((data) => data.id !== id));
    const res = await fetchCheckPatchtNews(id, {
      publishState: 2,
      publishTime: Date.now(),
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
            {title}
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
        return <span>{category.title}</span>;
      },
    },
    {
      title: "审核状态",
      dataIndex: "auditState",
      render: (auditState) => {
        return (
          <Tag color={colorStateList[auditState]}>
            {auditStateList[auditState]}
          </Tag>
        );
      },
    },
    {
      title: "操作",
      render: (item) => {
        // item
        return (
          <Space>
            {item.auditState === 1 && (
              <Button size="small" onClick={() => revertHandel(item.id)}>
                撤销
              </Button>
            )}

            {item.auditState === 2 && (
              <Button
                size="small"
                type="primary"
                danger
                onClick={() => publishHandel(item.id)}
              >
                发布
              </Button>
            )}

            {item.auditState === 3 && (
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  setTimeout(() => {
                    navigate(`/news-manage/update/${item.id}`);
                  }, 200);
                }}
              >
                更新
              </Button>
            )}
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
