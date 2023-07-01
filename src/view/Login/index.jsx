import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space ,message} from "antd";
import {  useNavigate } from "react-router-dom";

import styles from "./index.module.css";

import { fetchGetUsersLogin } from "../../utils/api";

import {reactLocalStorage} from 'reactjs-localstorage';

export default function Login() {
  const navigate = useNavigate(); 

  const onFinish = async (values) => { 
    let userData = await fetchGetUsersLogin(values) 

    // 判断是否是可用用户
    if(userData.length > 0){ 
      delete  userData[0].password
      reactLocalStorage.setObject('token', userData[0]);
      navigate('/home');
    } else {
      message.error(`登陆失败`);
    }
  };

  return (
    <div className={styles["login-page-container"]} style={{}}>
      <i className={styles["mask"]}></i>
      <div className={styles["login-wrapper"]}>
        <h2>后台系统</h2>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Space
              size="large"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
              <a href="#" style={{ color: "#fff" }}>
                注册
              </a>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
