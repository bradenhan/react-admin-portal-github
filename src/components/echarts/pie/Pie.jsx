import React from "react";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

export default function Pie(props) {
  const option1 = {
    title: {
      text: props.title,   
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: props.SeriesDataList,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <div>
      <ReactEcharts
        style={{ width: "500px", height: "300px" }}
        option={option1}
      />
    </div>
  );
}
