import React, { useEffect, useState } from "react";
import { routers } from "../router";
import { matchRoutes, useNavigate, useLocation } from "react-router-dom";

export default function PageHeader() {
  const location = useLocation();
  const routeList = matchRoutes(routers, location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象

  const [currentPageTitle, setcurrentPageTitle] = useState("");

  useEffect(() => {
    var current = routeList.filter((item) => {
      return item.pathname === location.pathname;
    });
    setcurrentPageTitle(current[0].route.label);
  }, []);

  return <div>ss-  {currentPageTitle}</div>;
}
