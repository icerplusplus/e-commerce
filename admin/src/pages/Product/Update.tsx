import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useModal,
  useNotification,
  useProducts,
  useUploadFile,
} from "../../hooks";
import {
  addProductInfoById,
  deleteProductInfoById,
  queryCategorySeletor,
  queryProduct,
  queryProductInfoByProductId,
  updateProductById,
  updateProductInfoById,
} from "../../api";
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Progress,
  Select,
  Space,
  Table,
  Tag,
  Upload,
  message,
} from "antd";
import type { UploadProps } from "antd";
import Spiner from "../../components/Spiner";
import {
  DeleteOutlined,
  EditOutlined,
  InboxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { TEXT_EDITOR } from "../../configs";
import "./index.css";
import { arrayHandler } from "../../libs";
import Thumbnails from "../../components/Thumbnails";

interface InfoProps {
  code: string;
  name: string;
  value: string;
}

interface InfoFormProps {
  item?: InfoProps[] | [] | string;
  modalDestroy: void;
  setInfosIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface InfoTableProps {
  productId?: string | number;
  setInfosIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const InfoUpdateForm: React.FC<InfoFormProps> = ({
  item,
  modalDestroy,
  setInfosIsLoading,
}) => {
  const [form] = Form.useForm();

  const updateInfo = useCallback(async (infos) => {
    await updateProductInfoById(infos);
  }, []);

  const onFinish = async (values: any) => {
    try {
      setInfosIsLoading(true);
      values.product_id = item?.product_id;
      await updateInfo(values);

      setInfosIsLoading(false);
      modalDestroy();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      {...formItemLayout}
      initialValues={{ ...item }}
      form={form}
      name="updateInfo"
      onFinish={onFinish}
      style={{ width: "80%", alignItems: "center" }}
      scrollToFirstError
    >
      <Form.Item name="id" label="Id">
        <Input disabled />
      </Form.Item>
      <Form.Item name="code" label="Code">
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="name"
        label="Title"
        rules={[
          {
            required: true,
            message: "Please input your title!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="value"
        label="Value"
        rules={[
          {
            required: true,
            message: "Please input your value!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Space>
          <Button type="dashed" onClick={() => modalDestroy()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

const InfoAddForm: React.FC<InfoFormProps> = ({
  item,
  modalDestroy,
  setInfosIsLoading,
}) => {
  const [form] = Form.useForm();

  const addProduct = useCallback(async (infos) => {
    await addProductInfoById(infos);
  }, []);

  const onFinish = async (values: any) => {
    try {
      setInfosIsLoading(true);
      values.code = values?.name.toLowerCase().replaceAll(" ", "_");
      values.product_id = item;
      await addProduct(values);
      setInfosIsLoading(false);
      modalDestroy();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="addInfo"
      onFinish={onFinish}
      style={{ width: "80%", alignItems: "center" }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Title"
        rules={[
          {
            required: true,
            message: "Please input your title!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="value"
        label="Value"
        rules={[
          {
            required: true,
            message: "Please input your value!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Space>
          <Button type="dashed" onClick={() => modalDestroy()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

const InfoTable: React.FC<InfoTableProps> = ({
  productId,
  setInfosIsLoading,
}) => {
  const [infos, setInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modal = useModal();
  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  useEffect(() => {
    const fetchProductInfo = async () => {
      setIsLoading(true);
      const data = await queryProductInfoByProductId(productId);
      if (data) setInfos(data.data.infos);
      setIsLoading(false);
    };
    fetchProductInfo();
  }, []);

  if (isLoading) return <Spiner />;

  const deleteInfo = async (id) => {
    await deleteProductInfoById(id);
    setInfosIsLoading(false);
  };

  const dataSoure = infos?.map((item) => {
    return {
      key: item.code,
      name: item.name,
      value: item.value,
      actions: (
        <Space size={[0, 8]} wrap>
          <Tag
            icon={<EditOutlined />}
            color="green"
            className="cursor"
            onClick={() => {
              modal.info({
                title: "Update info",
                content: (
                  <InfoUpdateForm
                    item={item}
                    modalDestroy={() => Modal.destroyAll()}
                    setInfosIsLoading={setInfosIsLoading}
                  />
                ),
                footer: null,
              });
            }}
          >
            Edit
          </Tag>
          <Tag
            icon={<DeleteOutlined />}
            color="error"
            className="cursor"
            onClick={() => {
              setInfosIsLoading(true);
              modal.confirm({
                title: "Warning!",
                content: "This info will be remove!",
                onOk: () => {
                  deleteInfo(item?.id);
                },
                onCancel: () => setInfosIsLoading(false),
              });
            }}
          >
            Delete
          </Tag>
        </Space>
      ),
    };
  });

  return (
    <>
      <Table dataSource={dataSoure} columns={columns} pagination={false} />
      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={() => {
          modal.info({
            title: "Add info",
            content: (
              <InfoAddForm
                item={productId}
                modalDestroy={() => Modal.destroyAll()}
                setInfosIsLoading={setInfosIsLoading}
              />
            ),
            footer: null,
          });
        }}
      >
        Add more
      </Button>
    </>
  );
};

export const Update: React.FC = () => {
  const editorRef = useRef(null);
  const categoryRef = useRef(null);
  const [form] = Form.useForm();
  const [infosIsLoading, setInfosIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [thumbResponse, setThumbResponse] = useState([]);

  const {
    isLoading,
    onLoading,
    productUpdate: product,
    updateProduct,
  } = useProducts();

  // UPDATE PRODUCT

  const fetchCategories = useCallback(async () => {
    onLoading(true);
    const data = await queryCategorySeletor();
    if (data) setCategories(data?.data?.categories);
    onLoading(false);
  }, []);

  const update = useCallback(async (infos) => {
    await updateProduct(infos);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  if (isLoading || !product) return <Spiner />;

  const onFinish = async (values: unknown) => {
    values.thumbnails = [];
    values.thumbnails = values.thumbnails.concat(product?.thumbnails);

    values.description = editorRef.current.getContent();
    if (categoryRef.current) values.category_id = categoryRef.current;

    // update thumbnails

    values.thumbnails = arrayHandler.uniqueStrings(thumbResponse);

    await update(values);
  };

  const textEditor = (content: unknown, witdh: number) => (
    <Editor
      apiKey={TEXT_EDITOR}
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={content}
      init={{
        height: witdh,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );

  return (
    <Form
      initialValues={{ ...product }}
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ width: "80%", alignItems: "center" }}
      scrollToFirstError
    >
      <Form.Item
        name="id"
        label="Id"
        rules={[
          {
            required: true,
            message: "Please input your Id!",
          },
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            type: "string",
            message: "The input is not valid Title!",
          },
          {
            required: true,
            message: "Please input your Title!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="brand_name"
        label="Brand name"
        rules={[
          {
            type: "string",
            message: "The input is not valid Brand name!",
          },
          {
            required: true,
            message: "Please input your Brand name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="category_id"
        label="Category"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={(v) => (categoryRef.current = v)}
          allowClear
          key={"categorySelectorData"}
        >
          {categories?.map((cate) => (
            <Select.Option key={cate?.id} value={cate?.id}>
              <Space>
                <Avatar src={cate?.thumbnail} />
                {cate.title}
              </Space>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="root_price"
        label="Root Price"
        rules={[
          {
            type: "number",
            message: "The input is not valid Root Price!",
          },
          {
            required: true,
            message: "Please input your Root Price!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sale_price"
        label="Sale Price"
        rules={[
          {
            type: "number",
            message: "The input is not valid Sale Price!",
          },
          {
            required: true,
            message: "Please input your Sale Price!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="discount"
        label="Discount"
        rules={[
          {
            type: "number",
            message: "The input is not valid Discount!",
          },
          {
            required: true,
            message: "Please input your Discount!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="discount_rate"
        label="Discount Rate"
        rules={[
          {
            type: "number",
            message: "The input is not valid Discount Rate!",
          },
          {
            required: true,
            message: "Please input your Discount Rate!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="short_description"
        label="Short Description"
        rules={[
          {
            type: "string",
            message: "The input is not valid Short Description!",
          },
          {
            required: true,
            message: "Please input your Short Description!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="rating_average"
        label="Rating Average"
        rules={[
          {
            type: "number",
            message: "The input is not valid Rating Average!",
          },
          {
            required: true,
            message: "Please input your Rating Average!",
          },
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="review_count"
        label="Review Count"
        rules={[
          {
            type: "number",
            message: "The input is not valid Review Count!",
          },
          {
            required: true,
            message: "Please input your Review Count!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="quantity_in_stock"
        label="Quantity In Stock"
        rules={[
          {
            type: "number",
            message: "The input is not valid Quantity In Stock!",
          },
          {
            required: true,
            message: "Please input your Quantity In Stock!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="quantity_sold"
        label="Quantity Sold"
        rules={[
          {
            type: "number",
            message: "The input is not valid Quantity Sold!",
          },
          {
            required: true,
            message: "Please input your Quantity Sold!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="thumbnails" label="Thumbnails">
        <Thumbnails
          productId={product?.id}
          setThumbResponse={setThumbResponse}
        />
      </Form.Item>

      <Form.Item label="Information">
        {infosIsLoading ? (
          <Spiner />
        ) : (
          <InfoTable
            productId={product?.id}
            setInfosIsLoading={setInfosIsLoading}
          />
        )}
      </Form.Item>
      <Form.Item label="Description">
        {textEditor(product.description, 1000)}
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Space>
          <Button type="link" htmlType="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
