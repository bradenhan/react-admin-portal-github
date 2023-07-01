import React, { useEffect, useState } from "react";
import { Button, Space, List, Col, Row, Card, Drawer } from "antd";

import _ from "lodash";

import {
  fetchGetViewsDescNewsList,
  fetchGetBarChartNewsList,
} from "../../utils/api";

import ArticleListShow from "./components/ArticleListShow";
import PersonalCard from "./components/PersonalCard";

import Bar from "../../components/echarts/bar/Bar";
import Pie from "../../components/echarts/pie/Pie";

 import { reactLocalStorage } from "reactjs-localstorage";

export default function HomeIndex() {
  const [ViewsDescList, setViewsDescList] = useState([]);
  const [StarDescList, setStarDescList] = useState([]);
  const [BarChartData, setBarChartData] = useState(null);

  const [AllDataList, setAllDataList] = useState([]);
  const [PieSeriesDataList, setPieSeriesDataList] = useState(null);

  // 获取浏览最多数据
  const loadViewsDescData = async () => {
    let obj = {
      publishState: 2,
      sort: "view",
      order: "desc",
      limit: 4,
    };
    const viewsDescListData = await fetchGetViewsDescNewsList(obj);
    setViewsDescList(viewsDescListData);
  };

  // 获取柱状图数据
  const loadBarChartData = async () => {
    let obj = {
      publishState: 2,
    };
    const BarChartData = await fetchGetBarChartNewsList(obj);
    console.log(BarChartData); 
    setBarChartData(_.groupBy(BarChartData, (item) => item.category.title));  
    pieData(BarChartData);
  };

  // 获取浏览最多数据
  const loadStarDescData = async () => {
    let obj = {
      publishState: 2,
      sort: "star",
      order: "desc",
      limit: 4,
    };
    const viewsDescListData = await fetchGetViewsDescNewsList(obj);
    setStarDescList(viewsDescListData);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = (value) => {
    // console.log(value);
    setOpen(value);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadViewsDescData();
    loadStarDescData();
    loadBarChartData();
  }, []);

  // 获取用户权限列表
  const { username } = JSON.parse(window.localStorage.getItem('token'))  // reactLocalStorage.getObject("token");
  const pieData = async (data) => { 
      console.log(data);
      var currentList = data.filter((item) => item.author === username);
      console.log(currentList);
      var groupObj = _.groupBy(currentList, (item) => item.category.title);
      console.log(groupObj);
      let list = [];

      for (let key in groupObj) {
        list.push({
          name: key,
          value: groupObj[key].length,
        });
      }

      console.log(list);
      setPieSeriesDataList(list); 
  };

  return (
    <div>
      <Row
        gutter={16}
        style={{
          height: "400px",
        }}
      >
        <Col span={7}>
          <Card
            title="用户最常浏览"
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <ArticleListShow data={ViewsDescList}> </ArticleListShow>
          </Card>
        </Col>
        <Col span={7}>
          <Card
            title="用户最长浏览"
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <ArticleListShow data={StarDescList}> </ArticleListShow>
          </Card>
        </Col>
        <Col span={10}>
          <PersonalCard
            height="300px"
            showDrawerValue={false}
            showDrawerHandel={showDrawer}
          ></PersonalCard>
        </Col>
      </Row>
      <Row
        gutter={16}
        style={{
          height: "400px",
        }}
      >
        <Col span={10}>
          {!!BarChartData && (
            <Bar title="新闻分类图示" legendText="数量" data={BarChartData} />
          )}
        </Col>
        <Col span={14}>    
        {!!PieSeriesDataList && (
          <Pie
            title="新闻分类图示"
            legendText="数量"
            SeriesDataList={PieSeriesDataList}
          />
        )}</Col>
      </Row>

      <Drawer
        title="个人新闻分类"
        placement="right"
        onClose={onClose}
        open={open}
        style={{
          width: "500px",
        }}
      >
        {!!PieSeriesDataList && (
          <Pie
            title="新闻分类图示"
            legendText="数量"
            SeriesDataList={PieSeriesDataList}
          />
        )}
      </Drawer>
    </div>
  );
}
