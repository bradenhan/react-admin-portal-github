import React from "react";
import { Button } from "antd";
import NewsPublish from "./components/NewsPublishComponent";
import usePublish from "./components/usePublish";

export default function OffShelf() {
  const { dataSource, handelDelete } = usePublish(3);

  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button size="small" danger onClick={() => handelDelete(id)}>
            删除
          </Button>
        )}
      ></NewsPublish>
    </div>
  );
}
