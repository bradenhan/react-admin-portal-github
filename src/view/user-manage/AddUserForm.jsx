import React,  { forwardRef, useEffect, useState } from "react";
import { Form, Input, Modal, Radio, Select } from "antd";

const AddUserModal = forwardRef(
  ({ open, onCreate, onCancel, regionList, rolesList ,checkAddUsersRegionDisabled }, ref) => { 

    const [regionDisable, setregionDisable] = useState(false)  
    
    return (
      <div>
        <Modal
          open={open}
          title="添加用户"
          okText="确定"
          cancelText="取消"
          onCancel={onCancel}
          onOk={() => {
            ref.current.validateFields()
              .then((values) => {
                console.log(values)
                onCreate(values);
                ref.current.resetFields();
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
              rules={ [
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]}
            > 
              <Select onChange={(value)=>{ 
                    if(value === 1){
                      setregionDisable(true)
                        ref.current.setFieldsValue({
                            region:""
                        })
                    }else{
                      setregionDisable(false)
                    }
                }}>
                {rolesList.map((item) => (
                  <Select.Option value={item.id} key={item.id} disabled = {checkAddUsersRegionDisabled(item,'rolesList')}>
                    {item.roleName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="region"
              label="部门"
              rules={regionDisable ? [] :[
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]}
            >
              <Select disabled={regionDisable}>
                {regionList.map((item) => (
                  <Select.Option value={item.value} key={item.id} disabled = {checkAddUsersRegionDisabled(item,'regionList')}>
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

export default AddUserModal;
