import React from "react";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

export default function Bar(props) {
  const option1 = {
    title: {
      text: props.title, 
      left: "left",
    },
    legend: { 
       data: [props.legendText],
    },
    xAxis: {
      type: "category",
      data: Object.keys(props.data), 
      axisLabel: {
        interval: 0,
        rotate: 30
      },
    },
    yAxis: {
      type: "value", 
      minInterval: 1
    },
    series: [
      {
        name: props.legendText,
        data: Object.values(props.data).map(item=>item.length),
        type: "bar",
      },
    ],
  };
  return (
    <div> 
      <ReactEcharts style={{width: '100%'}} option={option1} />
    </div>
  );
}
