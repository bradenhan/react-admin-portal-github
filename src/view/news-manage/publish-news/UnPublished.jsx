import React from "react";
import { Button } from "antd";
import NewsPublish from "./components/NewsPublishComponent";
import usePublish from "./components/usePublish";

export default function UnPublished() {
  const { dataSource, handelPublish } = usePublish(1);

  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button size="small" type="primary" onClick={() => handelPublish(id)}>
            发布
          </Button>
        )}
      ></NewsPublish>
    </div>
  );
}
