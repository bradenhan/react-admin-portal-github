import React, { forwardRef, useEffect, useState } from "react";
import { Button, Select, Space, Form, Input } from "antd";

import { fetchGetCategoriesList } from "../../../utils/api";
import MarkdownEditor from "./MarkdownEditor/Index";

const NewsAudit = forwardRef(({ onCreateNewsFinish, newsContentData }, ref) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    onCreateNewsFinish(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [optionsList, setoptionsList] = useState([]);
  const [context, setcontext] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const categoriesListData = await fetchGetCategoriesList();
      setoptionsList(categoriesListData);
    };
    fetchData(); 

    if (!!newsContentData) {
      let { title, categoryId, content } = newsContentData;
      ref.current.setFieldsValue({
        title,
        categoryId,
        content,
      });
      
      setcontext(content);
    }
  }, []);
 

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeContext = (value) => {
    console.log(`onChangeContext`);
    console.log(value);
    setcontext(value);
  };

  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        ref={ref}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[
            {
              required: true,
              message: "请输入标题!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="分类"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "请输入分类!",
            },
          ]}
        >
          <Select onChange={handleChange}>
            {optionsList.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="内容"
          name="content"
          rules={[
            {
              required: true,
              message: "请输入内容!",
            },
          ]}
        >
          <div>
            <MarkdownEditor
              onChangeContext={onChangeContext}
              readOnly={false}
              value={context}
            ></MarkdownEditor>
          </div>
        </Form.Item>

        <Form.Item
          style={{
            margin: "20px 0 0",
            textAlign: "center",
          }}
        >
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default NewsAudit;
