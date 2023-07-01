import React from "react";
import { Button } from "antd";
import NewsPublish from "./components/NewsPublishComponent";
import usePublish from "./components/usePublish";

export default function Published() {
  const { dataSource, handelOffShelf } = usePublish(2);

  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button size="small" danger onClick={() => handelOffShelf(id)}>
            下线
          </Button>
        )}
      ></NewsPublish>
    </div>
  );
}
