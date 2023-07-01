import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, Modal, Tree } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import {
  fetchGetRoles,
  fetchGetMenus,
  fetchDeleteRoles,
  fetchPatchRoles,
} from "../../utils/api";
const { confirm } = Modal;

export default function RoleList() {
  const [dataSource, setdataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rightList, setrightList] = useState([]); // 权限列表
  const [currentRights, setcurrentRights] = useState([]); // 选中的权限列表
  const [currentRightId, setcurrentRightId] = useState(0); //  选中的角色id

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      render: (roleName) => {
        return <Tag color="magenta">{roleName}</Tag>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <Space>
            <Button
              icon={<EditOutlined style={{ fontSize: "12px" }} />}
              shape="circle"
              type="primary"
              size="small"
              onClick={() => showModal(item)}
            ></Button>
            {/* disabled={item.pagepermisson === undefined} */}

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

  useEffect(() => {
    const fetchGetRolesHandle = async () => {
      const roleListData = await fetchGetRoles(); 
      setdataSource(roleListData);
    };
    fetchGetRolesHandle();
  }, []);

  useEffect(() => {
    const fetchGetMenusHandle = async () => {
      const menusListData = await fetchGetMenus();
      menusListData.forEach((element) => {
        if (element.children.length === 0) {
          element.children = "";
        }
      });
      setrightList(menusListData);
    };
    fetchGetMenusHandle();
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
        deleteRolesMethod(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // 删除事件
  const deleteRolesMethod = async (item) => {
    console.log(item);
    setdataSource(dataSource.filter((data) => data.id != item.id));
    const menusListData = await fetchDeleteRoles(item.id);
  };

  // modal操作
  const showModal = (item) => {
    setIsModalOpen(true);
    setcurrentRights(item.rights);
    setcurrentRightId(item.id);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    // 同步datasource
    setdataSource(
      dataSource.map((item) => {
        if (item.id === currentRightId) {
          return {
            ...item,
            rights: currentRights,
          };
        }
        return item;
      })
    );

    // 调用后台接口
    await fetchPatchRoles(currentRightId, { rights: currentRights });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  // 选中的权限列表
  const onCheckHandle = (key) => {
    console.log(key);
    setcurrentRights(key.checked);
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>
      <Modal
        title="角色管理"
        okText="确定"
        cancelText="取消"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Tree
            checkable
            onCheck={onCheckHandle}
            checkStrictly
            checkedKeys={currentRights}
            treeData={rightList}
          />
        </div>
      </Modal>
    </div>
  );
}
