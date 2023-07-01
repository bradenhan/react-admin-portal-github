import React from "react";
import { Space, Table,Button} from "antd"; 
import { useNavigate } from "react-router-dom"; 
export default function NewsPublish({ dataSource,button }) {
  const navigate = useNavigate();
  const goToDetail = (item) => { 
    setTimeout(() => {
      navigate(`/news-manage/preview/${item.id}`);
    }, 200);
  };

  const columns = [
    {
      title: "新闻名称",
      dataIndex: "title",
      render: (title, item) => {
        return (
          <Button type="link" color="magenta" onClick={() => goToDetail(item)}>
            {title}
          </Button>
        );
      },
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "分类",
      dataIndex: "category",
      render: (category) => {
        return <span>{category.title}</span>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        // item
        return (
          <Space> 
            {button(item.id)}
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(item) => item.id} 
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
}
