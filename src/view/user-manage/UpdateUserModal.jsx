import  React, { forwardRef, useState, useEffect } from "react";
import { Form, Input, Modal, Select } from "antd";

const UpdateUserModal = forwardRef(
  (
    {
      open,
      onUpdataUserConfirm,
      onUpdataUserCancel,
      regionList,
      rolesList,
      isRegionDisable,
      checkUpdateuserRegionDisabled,
    },
    ref
  ) => {
    const [isRegionDisableValue, setisRegionDisableValue] =
      useState(isRegionDisable);

    useEffect(() => {
      setisRegionDisableValue(isRegionDisable);
    }, [isRegionDisable]);

    return (
      <div>
        <Modal
          open={open}
          title="更新用户"
          okText="确定"
          cancelText="取消"
          onCancel={onUpdataUserCancel}
          onOk={() => {
            ref.current
              .validateFields()
              .then((values) => {
                console.log(values);
                onUpdataUserConfirm(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          <Form
            ref={ref}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: "public",
            }}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="roleId"
              label="角色"
              rules={[
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]}
            >
              <Select
                onChange={(value) => {
                  if (value === 1) {
                    setisRegionDisableValue(true);
                    ref.current.setFieldsValue({
                      region: "",
                    });
                  } else {
                    setisRegionDisableValue(false);
                  }
                }}
              >
                {rolesList.map((item) => (
                  <Select.Option value={item.id} key={item.id} disabled = {checkUpdateuserRegionDisabled(item,'rolesList')}>
                    {item.roleName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="region"
              label="部门"
              rules={
                isRegionDisableValue
                  ? []
                  : [
                      {
                        required: true,
                        message: "Please input the title of collection!",
                      },
                    ]
              }
            >
              <Select disabled={isRegionDisableValue}>
                {regionList.map((item) => (
                  <Select.Option value={item.value} key={item.id}  disabled = {checkUpdateuserRegionDisabled(item,'regionList')}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
);

export default UpdateUserModal;
