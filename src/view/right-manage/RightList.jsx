import React,   { useState, useEffect } from "react";
import { Space, Switch, Table, Tag, Button, Modal, Popover } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import {
  fetchGetMenus,
  fetchDeleteMenus,
  fetchDeleteSubMenus,
  fetchPatchMenus,
  fetchPatchSubMenus,
} from "../../utils/api";
const { confirm } = Modal;
export default function RightList() {
  const [dataSource, setdataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const menusListData = await fetchGetMenus();
      menusListData.forEach((element) => {
        if (element.children.length === 0) {
          element.children = "";
        }
      });
      setdataSource(menusListData);
    };
    fetchData();
  }, []);

  // 删除弹框事件
  const confirmHandel = (item) => {
    confirm({
      title: "您确定要删除吗?",
      icon: <ExclamationCircleFilled />,
      content: "此处删除会删除掉左侧导航，请谨慎操作！",
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

  // 删除事件
  const deleteRightMethod = async (item) => {
    console.log(item);
    if (item.grade === 1) {
      setdataSource(dataSource.filter((data) => data.id != item.id));
      const menusListData = await fetchDeleteMenus(item.id);
    } else if (item.grade === 2) {
      let list = dataSource.filter((data) => data.id === item.rightId);
      list[0].children = list[0].children.filter((data) => data.id !== item.id);
      setdataSource([...dataSource]);
      const menusListData = await fetchDeleteSubMenus(item.id);
    } else {
      return false;
    }
  };

  // 编辑事件
  const switchChange = async (item) => {
    console.log(item);
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
    setdataSource([...dataSource]);
    if (item.grade === 1) {
      await fetchPatchMenus(item.id, { pagepermisson: item.pagepermisson });
    } else if (item.grade === 2) {
      await fetchPatchSubMenus(item.id, { pagepermisson: item.pagepermisson });
    } else {
      return false;
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "权限名称",
      dataIndex: "title",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key) => {
        return <Tag color="magenta">{key}</Tag>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        // item
        return (
          <Space>
            <Popover
              style={{ width: "100px" }}
              content={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <h5 style={{padding: '0 10px 0 0'}}>显示左侧导航栏</h5>{" "}
                  <Switch
                    size="small"
                    checked={item.pagepermisson === 1 ? true : false}
                    onChange={() => switchChange(item)}
                  />
                </div>
              }
              title="左侧导航栏权限配置"
              trigger={item.pagepermisson === undefined ? "" : "click"}
            >
              <Button
                icon={<EditOutlined style={{ fontSize: "12px" }} />}
                shape="circle"
                type="primary"
                size="small"
                disabled={item.pagepermisson === undefined}
              ></Button>
            </Popover>

            <Button
              icon={<DeleteOutlined style={{ fontSize: "12px" }} />}
              shape="circle"
              danger
              size="small"
              onClick={() => {
                confirmHandel(item);
              }}
            ></Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}
