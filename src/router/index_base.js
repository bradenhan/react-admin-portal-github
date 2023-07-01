import { lazy, ReactNode, Suspense } from "react";

import {
  AppstoreOutlined, 
} from "@ant-design/icons";
// 切换页面会出现闪屏现象
// 解决思路：公共页面不采用懒加载的方式 并在App.tsx去除Suspense的包裹
import AppLayout from "../AppLayout";

// 用懒加载实现优化
// const AppLayout = lazy(() => import('../AppLayout'));
const Detail = lazy(() => import("../view/Detail"));
const Home = lazy(() => import("../view/Home"));
const Login = lazy(() => import("../view/Login"));
const User = lazy(() => import("../view/User"));
const RightList = lazy(() => import("../view/right-manage/RightList"));
const RoleList = lazy(() => import("../view/right-manage/RoleList"));
const UserList = lazy(() => import("../view/user-manage/UserList"));


// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

 const routers = [
  {
    path: "/",
    label: "首页",
    icon: <AppstoreOutlined />,
    element: <AppLayout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        path: "/home",
        label: "首页",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<Home />),
      },
      {
        path: "/user-manage/add",
        label: "添加用户",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/user-manage/delete",
        label: "删除用户",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/user-manage/update",
        label: "修改用户",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/user-manage/list",
        label: "用户列表",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<UserList />),
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
      },
      {
        path: "/right-manage/right/list",
        label: "权限列表",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<RightList />),
      },
      {
        path: "/right-manage/role/update",
        label: "修改角色",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/right-manage/role/delete",
        label: "删除角色",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/right-manage/right/update",
        label: "修改权限",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/right-manage/right/delete",
        label: "删除权限",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
    ],
  },{
    path: "/news-manage",
    label: "新闻管理",
    icon: <AppstoreOutlined />,
    element: <AppLayout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        path: "/news-manage/list",
        label: "新闻列表",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/news-manage/add",
        label: "撰写新闻",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/news-manage/update/:id",
        label: "新闻更新",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/news-manage/preview/:id",
        label: "新闻预览",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/news-manage/draft",
        label: "草稿箱",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/news-manage/category",
        label: "新闻分类",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
    ],
  },{
    path: "/audit-news-manage",
    label: "审核管理",
    icon: <AppstoreOutlined />,
    element: <AppLayout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        path: "/audit-news-manage/audit",
        label: "审核新闻",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/audit-news-manage/list",
        label: "审核列表",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      }, 
    ],
  },{
    path: "/publish-manage",
    label: "发布管理",
    icon: <AppstoreOutlined />,
    element: <AppLayout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        path: "/publish-manage/unpublished",
        label: "待发布",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      },
      {
        path: "/publish-manage/published",
        label: "已发布",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      }, 
      {
        path: "/publish-manage/sunset",
        label: "已下线",
        icon: <AppstoreOutlined />,
        element: lazyLoad(<User />),
      }, 
    ],
  },
  {
    path: "/login",
    label: "登录",
    element: lazyLoad(<Login />),
  },
];
export default routers