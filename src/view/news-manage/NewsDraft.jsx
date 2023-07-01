import React,   { useState, useEffect } from "react";
import { Space, Table, Tag, Button, notification, Modal, Popover } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  VerticalAlignTopOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import {
  fetchGetNewsList,
  fetchDeleteNews,
  fetchCheckPatchtNews,
} from "../../utils/api";

import { useNavigate } from "react-router-dom";

 import { reactLocalStorage } from "reactjs-localstorage";

const { confirm } = Modal;

export default function DarfList() {
  const [dataSource, setdataSource] = useState([]);

  // 获取用户权限列表
  const { username } = JSON.parse(window.localStorage.getItem('token'))  // reactLocalStorage.getObject("token");

  const fetchData = async () => {
    let params = {
      author: username,
      auditState: 0,
    };
    const newsListData = await fetchGetNewsList(params);
    setdataSource(newsListData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 删除弹框事件
  const confirmHandel = (item) => {
    confirm({
      title: "您确定要删除吗?",
      icon: <ExclamationCircleFilled />,
      content: "此处删除会删除掉站内信，请谨慎操作！",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        console.log("OK");
        deleteRightMethod(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const navigate = useNavigate();
  const goToDetail = (item) => {
    console.log(item);
    setTimeout(() => {
      navigate(`/news-manage/preview/${item.id}`);
    }, 200);
  };

  // 删除事件
  const deleteRightMethod = async (item) => {
    console.log(item);
    setdataSource(dataSource.filter((data) => data.id === item.rightId));
    const newsListData = await fetchDeleteNews(item.id);
    fetchData();
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
        navigate(`/audit-news-manage/list`);
      }, 200);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
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
        return <Tag color="magenta">{category.title}</Tag>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        // item
        return (
          <Space>
            <Button
              icon={<EditOutlined style={{ fontSize: "12px" }} />}
              shape="circle"
              type="primary"
              size="small"
              onClick={() => {
                setTimeout(() => {
                  navigate(`/news-manage/update/${item.id}`);
                }, 200);
              }}
            ></Button>

            <Button
              icon={<DeleteOutlined style={{ fontSize: "12px" }} />}
              shape="circle"
              danger
              size="small"
              onClick={() => {
                confirmHandel(item);
              }}
            ></Button>

            <Button
              icon={<VerticalAlignTopOutlined style={{ fontSize: "12px" }} />}
              shape="circle"
              size="small"
              onClick={() => checkHandel(item.id)}
            ></Button>
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
