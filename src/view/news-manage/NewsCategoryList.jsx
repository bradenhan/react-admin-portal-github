import React, { useContext, useEffect, useRef, useState } from "react";
import { Space, Input, Table, Form, Tag, Button, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import {
  fetchGetCategoriesList,
  fetchDeleteCategories,
  fetchPatchtCategories,
} from "../../utils/api";
const { confirm } = Modal;

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export default function NewsCategoryList() {
  const [dataSource, setdataSource] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "栏目名称",
      dataIndex: "title",
      render: (roleName) => {
        return <Tag color="magenta">{roleName}</Tag>;
      },
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: "title",
        title: "栏目名称",
        handleSave: handleSave,
      }),
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <Space>
            <Button
              icon={<DeleteOutlined style={{ fontSize: "12px" }} />}
              shape="circle"
              danger
              size="small"
              onClick={() => {
                confirmHandel(item);
              }}
            ></Button>
          </Space>
        );
      },
    },
  ];

  const handleSave = async (row) => {
    console.log(row);
    // const newData = [...dataSource];
    // const index = newData.findIndex((item) => row.key === item.key);
    // const item = newData[index];
    // newData.splice(index, 1, {
    //   ...item,
    //   ...row,
    // });
    // console.log(newData)
    //  setdataSource(newData);

    setdataSource(
      dataSource.map((item) => {
        if (item.id === row.id) {
          return {
            id: item.id,
            title: row.title,
            value: row.title,
          };
        }
        return item;
      })
    );

    await fetchPatchtCategories(row.id, {
      title: row.title,
      value: row.title,
    });
  };

  useEffect(() => {
    const fetchGetCategoriesHandle = async () => {
      const categoriesListData = await fetchGetCategoriesList();
      setdataSource(categoriesListData);
    };
    fetchGetCategoriesHandle();
  }, []);

  // 删除弹框事件
  const confirmHandel = (item) => {
    confirm({
      title: "您确定要删除吗?",
      icon: <ExclamationCircleFilled />,
      content: "此处删除会删除掉栏目，请谨慎操作！",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        console.log("OK");
        deleteCategoriesMethod(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // 删除事件
  const deleteCategoriesMethod = async (item) => {
    console.log(item);
    setdataSource(dataSource.filter((data) => data.id != item.id));
    const categoriesListData = await fetchDeleteCategories(item.id);
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
      ></Table>
    </div>
  );
}
