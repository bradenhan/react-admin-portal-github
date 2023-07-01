import React from "react";
import { List } from "antd";

export default function articleListShow(props) {
  return (
    <div>
      <List
        dataSource={props.data}
        renderItem={(item, index) => (
          <List.Item> 
            <a href={`/news-manage/preview/${item.id}`}>{item.title}</a>
          </List.Item>
        )}
      />
    </div>
  );
}
