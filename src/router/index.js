
import React, { lazy,  Suspense } from "react";
import { AppstoreOutlined,HomeOutlined } from "@ant-design/icons";
// 切换页面会出现闪屏现象
// 解决思路：公共页面不采用懒加载的方式 并在App.tsx去除Suspense的包裹
import AppLayout from "../AppLayout";
import Page404 from "../view/Page404";

import {reactLocalStorage} from 'reactjs-localstorage';

// 用懒加载实现优化
// const AppLayout = lazy(() => import('../AppLayout'));
const Detail = lazy(() => import("../view/Detail"));
const Home = lazy(() => import("../view/Home"));
const Login = lazy(() => import("../view/Login"));
const User = lazy(() => import("../view/User"));
const RightList = lazy(() => import("../view/right-manage/RightList"));
const RoleList = lazy(() => import("../view/right-manage/RoleList"));
const UserList = lazy(() => import("../view/user-manage/UserList"));
const NewsAdd = lazy(() => import("../view/news-manage/AddNews"));
const NewsDraft = lazy(() => import("../view/news-manage/NewsDraft"));
const NewsPreview = lazy(() => import("../view/news-manage/NewsPreview"));
const NewsUpdate = lazy(() => import("../view/news-manage/NewsUpdate"));

const AuditNewsList = lazy(() => import("../view/news-manage/audit-news/AuditNewsList"));
const AuditNewsDetail = lazy(() => import("../view/news-manage/audit-news/AuditNewsDetail"));  
const NewsCategoryList = lazy(() => import("../view/news-manage/NewsCategoryList"));  

const UnPublishedNewsList = lazy(() => import("../view/news-manage/publish-news/UnPublished"));  
const PublishedNewsList = lazy(() => import("../view/news-manage/publish-news/Published"));  
const OffShelfNewsList = lazy(() => import("../view/news-manage/publish-news/OffShelf"));  

const VisitorNewsList = lazy(() => import("../view/visitorPages/news/List"));  
const VisitorNewsDetail = lazy(() => import("../view/visitorPages/news/Detail"));  

 
  console.log(2222)
  console.log(JSON.parse(window.localStorage.getItem('token')))
 

const {
  role: { rights },
} =  JSON.parse(window.localStorage.getItem('token'))
//JSON.parse(window.localStorage.getItem('token'))  // reactLocalStorage.getObject("token");

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children) => {
  return <Suspense fallback={<div> Loading... </div>}>{children}</Suspense>;
};

let routers = [
  {
    path: "",
    label: "首页",
    icon:<HomeOutlined />,
    element: <AppLayout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        path: "/home",
        label: "首页",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<Home />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/user-manage/add",
        label: "添加用户",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/user-manage/delete",
        label: "删除用户",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/user-manage/update",
        label: "修改用户",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/user-manage/list",
        label: "用户列表",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<UserList />),
        meta: {
          needLogin: true,
        },
      },
    ],
  },

  {
    path: "/right-manage",
    label: "权限管理",
    icon: <AppstoreOutlined />,
    element: <AppLayout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        path: "/right-manage/role/list",
        label: "角色列表",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<RoleList />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/right-manage/right/list",
        label: "权限列表",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<RightList />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/right-manage/role/update",
        label: "修改角色",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/right-manage/role/delete",
        label: "删除角色",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/right-manage/right/update",
        label: "修改权限",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/right-manage/right/delete",
        label: "删除权限",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
        meta: {
          needLogin: true,
        },
      },
    ],
  },
  {
    path: "/news-manage",
    label: "站内信管理",
    icon: <AppstoreOutlined />,
    element: <AppLayout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        path: "/news-manage/list",
        label: "站内信列表",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/news-manage/add",
        label: "撰写站内信",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<NewsAdd />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/news-manage/update/:id",
        label: "站内信更新",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<NewsUpdate />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/news-manage/preview/:id",
        label: "站内信预览",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<NewsPreview />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/news-manage/draft",
        label: "草稿箱",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<NewsDraft />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/news-manage/category",
        label: "站内信分类",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<NewsCategoryList />),
        meta: {
          needLogin: true,
        },
      }, 
    ],
  },
  {
    path: "/audit-news-manage",
    label: "审核管理",
    icon: <AppstoreOutlined />,
    element: <AppLayout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        path: "/audit-news-manage/audit",
        label: "审核站内信",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<AuditNewsDetail />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/audit-news-manage/list",
        label: "审核站内信列表",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<AuditNewsList />),
        meta: {
          needLogin: true,
        },
      },
    ],
  },
  {
    path: "/publish-manage",
    label: "发布管理",
    icon: <AppstoreOutlined />,
    element: <AppLayout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        path: "/publish-manage/unpublished",
        label: "待发布站内信",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<UnPublishedNewsList />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/publish-manage/published",
        label: "已发布站内信",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<PublishedNewsList />),
        meta: {
          needLogin: true,
        },
      },
      {
        path: "/publish-manage/sunset",
        label: "已下线站内信",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<OffShelfNewsList />),
        meta: {
          needLogin: true,
        },
      },
    ],
  },
  {
    path: "/login",
    label: "登录",
    element: lazyLoad(<Login />),
  },
  {
    path: "/visitor/news-list",
    label: "站内信列表",
    element: lazyLoad(<VisitorNewsList />),
  },
  {
    path: "/visitor/news-detail/:id",
    label: "站内信详情",
    element: lazyLoad(<VisitorNewsDetail />),
  },
  {
    path: "*",
    label: "无权限",
    element: <Page404 />,
  },
];

/**
 * @description: 全局路由拦截
 * @param {string} pathname 当前路由路径
 * @param {object} meta 当前路由自定义meta字段
 * @return {string} 需要跳转到其他页时，就返回一个该页的path路径，或返回resolve该路径的promise对象
 */
const onRouteBefore = ({ pathname, meta }) => {
  // 动态修改页面title
  if (meta.title !== undefined) {
    document.title = meta.title;
  }

  console.log('onRouteBefore')
  console.log(pathname)
  console.log(meta)

  var isLogin;
  // 判断未登录跳转登录页
  if (meta.needLogin) {
    if (!isLogin) {
      return "/path403";
    }
  }
};

export { routers, onRouteBefore };
