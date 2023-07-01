import React, { useEffect, useRef, useState } from "react";
import { Space, Switch, Table, Modal, Tag, Button } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

import AddUserModal from "./AddUserForm";
import UpdateUserModal from "./UpdateUserModal";

import {
  fetchGetUserList,
  fetchGetRegionList,
  fetchGetRoles,
  fetchAddUser,
  fetchDeleteUser,
  fetchPatchUser,
} from "../../utils/api";

 import { reactLocalStorage } from "reactjs-localstorage";

const { confirm } = Modal;

export default function UserList() {
  const [dataSource, setdataSource] = useState([]);

  // 获取用户权限列表
  const { roleId, region, username } = JSON.parse(window.localStorage.getItem('token'))  // reactLocalStorage.getObject("token");

  const roleInterface = {
    1: "superadmin",
    2: "regionadmin",
    3: "regionediter",
  };

  // 获取用户数据处理
  useEffect(() => {
    const fetchGetUserListHandle = async () => {
      const urseListData = await fetchGetUserList();

      // 注意此处
      setdataSource(
        roleInterface[roleId] === "superadmin"
          ? urseListData
          : [
              ...urseListData.filter((item) => item.username === username),
              ...urseListData.filter(
                (item) =>
                  item.region === region &&
                  roleInterface[item.roleId] === "regionediter"
              ),
            ]
      );
    };
    fetchGetUserListHandle();
  }, []);

  // 添加用户处理
  const [open, setOpen] = useState(false);
  const [regionList, setregionList] = useState([]);
  const [rolesList, serolesList] = useState([]);

  const AddUserFormData = useRef(null);
  // 获取用户数据处理
  useEffect(() => {
    // 获取用户数据处理
    const fetchGetRegionListHandle = async () => {
      const urseListData = await fetchGetRegionList();
      setregionList(urseListData);
    };
    fetchGetRegionListHandle();

    // 获取用户数据处理
    const fetchGetRolesListHandle = async () => {
      const urseListData = await fetchGetRoles();
      serolesList(urseListData);
    };
    fetchGetRolesListHandle();

    checkAddUsersRegionDisabled();
    checkUpdateuserRegionDisabled();
  }, []);

  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
    //post到后端，生成id，再设置 datasource, 方便后面的删除和更新

    const data = await fetchAddUser({
      ...values,
      roleState: true,
      default: false,
    });

    setdataSource([
      ...dataSource,
      {
        ...data,
        role: rolesList.filter((item) => item.id === values.roleId)[0],
      },
    ]);
  };

  // 删除弹框事件
  const confirmHandel = (item) => {
    confirm({
      title: "您确定要删除吗?",
      icon: <ExclamationCircleFilled />,
      content: "此处删除会删除用户，请谨慎操作！",
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
    const data = await fetchDeleteUser(item.id);
  };

  // 用户状态修改
  const handelChange = async (item) => {
    item.roleState = !item.roleState;
    setdataSource([...dataSource]);

    // 发送请求到后端
    await fetchPatchUser(item.id, { roleState: item.roleState });
  };

  // 用户信息更改
  const [openUpdateModal, setopenUpdateModal] = useState(false);
  const UpdateUserFormData = useRef(null);
  const [isRegionDisable, setisRegionDisable] = useState(false);
  const [curentUserData, setcurentUserData] = useState(null);

  const showUserModal = (item) => {
    console.log(item);
    setopenUpdateModal(true);
    setTimeout(() => {
      if (item.roleId === 1) {
        // 禁用
        setisRegionDisable(true);
      } else {
        // 取消禁用
        setisRegionDisable(false);
      }
      UpdateUserFormData.current.setFieldsValue(item);
      setcurentUserData(item);
    }, 10);
  };

  const onUpdataUserConfirm = async (values) => {
    setopenUpdateModal(false);

    setdataSource(
      dataSource.map((item) => {
        if (item.id === curentUserData.id) {
          return {
            ...item,
            ...values,
            role: rolesList.filter((item) => item.id === values.roleId)[0],
          };
        }
        return item;
      })
    );
    setisRegionDisable(!isRegionDisable);
    // 发送请求到后端
    await fetchPatchUser(curentUserData.id, values);
  };

  const checkAddUsersRegionDisabled = (item, type) => {
    if (type === "regionList") {
      if (roleInterface[roleId] === "superadmin") {
        return false;
      } else {
        return item?.value !== region;
      }
    } else if (type === "rolesList") {
      if (roleInterface[roleId] === "superadmin") {
        return false;
      } else {
        return roleInterface[item?.id] !== "regionediter";
      }
    }
  };

  const checkUpdateuserRegionDisabled = (item,type) => {
    

    if (type === "rolesList") {
      if (roleInterface[roleId] === "superadmin") {
        return false;
      } else {
        return roleInterface[item?.id] !== "regionediter";
      }
    } else {
      if (roleInterface[roleId] === "superadmin") {
        return false;
      } else {
        return true;
      }
    }
  };

  const columns = [
    {
      title: "部门",
      dataIndex: "region",
      render: (region) => {
        return region === "" ? "总部" : region;
      },
      filters: [
        ...regionList.map((item) => ({
          text: item.title,
          value: item.value,
        })),
        { text: "超级管理员", value: "超级管理员" },
      ],

      // 用户删选
      onFilter: (value, record) => {
        if (value === "超级管理员") {
          return record.region === "";
        } else {
          return record.region === value;
        }
      },
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => {
        return <Tag color="magenta">{role?.roleName}</Tag>;
      },
    },

    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户可用状态",
      dataIndex: "roleState",
      render: (roleState, item) => {
        // 注意这里
        return (
          <div>
            <Switch
              size="small"
              checked={roleState}
              disabled={item.default}
              onChange={() => handelChange(item)}
            />
          </div>
        );
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
              onClick={() => showUserModal(item)}
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
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ padding: "0 0 20px 0" }}>
        <Button
          size="small"
          type="primary"
          onClick={() => {
            setOpen(true);
            console.log(AddUserFormData);
          }}
        >
          添加用户
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
      <AddUserModal
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        regionList={regionList}
        checkAddUsersRegionDisabled={checkAddUsersRegionDisabled}
        rolesList={rolesList}
        ref={AddUserFormData}
      ></AddUserModal>

      <UpdateUserModal
        open={openUpdateModal}
        onUpdataUserConfirm={onUpdataUserConfirm}
        onUpdataUserCancel={() => {
          setopenUpdateModal(false);
        }}
        regionList={regionList}
        checkUpdateuserRegionDisabled={checkUpdateuserRegionDisabled}
        rolesList={rolesList}
        ref={UpdateUserFormData}
        isRegionDisable={isRegionDisable}
      ></UpdateUserModal>
    </div>
  );
}
