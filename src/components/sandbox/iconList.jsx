import React from 'react'
import {
  UserOutlined,
  LaptopOutlined, 
  HomeOutlined,
  KeyOutlined,
  MailOutlined,
  AuditOutlined,
  SendOutlined
} from "@ant-design/icons";

export const iconList = {
  "/home": < HomeOutlined / > ,
  "/user-manage": < UserOutlined / > ,
  "/user-manage/add": < UserOutlined / > ,
  "/user-manage/delete": < UserOutlined / > ,
  "/user-manage/update": < UserOutlined / > ,
  "/user-manage/list": < UserOutlined / > ,
  // 权限管理
  "/right-manage": < KeyOutlined / > ,
  "/right-manage/role/list": < UserOutlined / > ,
  "/right-manage/right/list": < UserOutlined / > ,
  "/right-manage/role/update": < UserOutlined / > ,
  "/right-manage/role/delete": < UserOutlined / > ,
  "/right-manage/right/update": < UserOutlined / > ,
  "/right-manage/right/delete": < UserOutlined / > ,
  // 新闻管理
  "/news-manage": < MailOutlined / > ,
  "/news-manage/list": < UserOutlined / > ,
  "/news-manage/add": < UserOutlined / > ,
  "/news-manage/update/:id": < UserOutlined / > ,
  "/news-manage/preview/:id": < UserOutlined / > ,
  "/news-manage/draft": < UserOutlined / > ,
  "/news-manage/category": < UserOutlined / > ,
  // 审核管理
  "/audit-news-manage": < AuditOutlined / > ,
  "/audit-news-manage/audit": < UserOutlined / > ,
  "/audit-news-manage/list": < UserOutlined / > ,
  // 发布管理
  "/publish-manage": < SendOutlined / > ,
  "/publish-manage/unpublished": < LaptopOutlined / > ,
  "/publish-manage/published": < UserOutlined / > ,
  "/publish-manage/sunset": < UserOutlined / >
}