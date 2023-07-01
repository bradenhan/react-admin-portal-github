import  React, { useEffect, useState } from "react";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import {
  fetchGetUnPublishedNewsList,
  fetchCheckPatchtNews,
  fetchPatchtNewsDetail,
  fetchDeleteNews,
} from "../../../../utils/api";
 import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";

function usePublish(type) {
  // 获取用户权限列表
  const { username } = JSON.parse(window.localStorage.getItem('token'))  // reactLocalStorage.getObject("token");
  const [dataSource, setdataSource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let params = {
        author: username,
        publishState: type, // publishStateList = ['未发布','待发布','已发布','已下线']
      };
      const newsListData = await fetchGetUnPublishedNewsList(params);

      setdataSource(newsListData);
    };

    fetchData();
  }, []);

  const handelPublish = async (id) => {
    console.log("handelPublish: -- " + id);
    setdataSource(dataSource.filter((item) => item.id !== id));

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
  const handelOffShelf = async (id) => {
    console.log("handelOffShelf: -- " + id);
    setdataSource(dataSource.filter((item) => item.id !== id));

    let obj = {
      publishState: 3,
    };
    let NewsState = await fetchPatchtNewsDetail(id, obj);
    if (!!NewsState) {
      notification.open({
        message: "通知",
        description: `您可以到 【发布管理/已下线】 中查看您的站内信`,
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
  const handelDelete = async (id) => {
    console.log("handelDelete: -- " + id);
    setdataSource(dataSource.filter((item) => item.id !== id));
    const NewsState = await fetchDeleteNews(id)
    if (!!NewsState) {
      notification.open({
        message: "通知",
        description: `您已经删除新闻`,
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

  return { dataSource, handelPublish, handelOffShelf, handelDelete };
}

export default usePublish;
