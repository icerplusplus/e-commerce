import { useRef, useState, useCallback, useEffect } from "react";
import { Button, Form, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./../../hooks";
import { arrayHandler } from "../../libs";
import Input from "../../components/Input";
import { addProduct, queryCategorySeletor } from "../../api";
import Spiner from "../../components/Spiner";
import Selector from "../../components/Selector";
import ThumbnailInput from "../../components/ThumbnailInput";
import { TEXT_EDITOR } from "../../configs";
import { Editor } from "@tinymce/tinymce-react";

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

export const Create: React.FC = () => {
  const categoryRef = useRef(null);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const thumbnailsRef = useRef([]);
  const editorRef = useRef(null);

  // NAVIGATION
  const navigate = useNavigate();

  // NOTIFICATION - HOOK CUSTOM
  const notification = useNotification();

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    const data = await queryCategorySeletor();
    if (data) setCategories(data?.data?.categories);

    setIsLoading(false);
  }, []);
  const selectCategory = (value) => (categoryRef.current = value);

  const thumbnailsOnChanged = useCallback((thumbs) => {
    thumbnailsRef.current = thumbs;
  }, []);

  const textEditor = (content, maxHeight) => (
    <Editor
      apiKey={TEXT_EDITOR}
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={content}
      init={{
        height: maxHeight,
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

  const createProduct = useCallback(async (infos) => {
    const data = await addProduct(infos);

    if (data.status === 200) {
      form.resetFields();
      window.scrollTo(0, 0);
      notification.success({
        message: "Product have been created!",
      });
    } else
      notification.error({
        message: data?.message || "Create failed!",
      });
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  if (isLoading) return <Spiner />;

  const onFinish = async (values) => {
    values.description = editorRef.current.getContent();
    if (categoryRef.current) values.category_id = categoryRef.current;

    // update thumbnails
    values.thumbnails = arrayHandler.uniqueStrings(thumbnailsRef.current) || [];

    await createProduct(values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="create"
      onFinish={onFinish}
      style={{ width: "80%", alignItems: "center" }}
      scrollToFirstError
    >
      <Input
        type="string"
        name="title"
        label="Title"
        disabled={isLoading}
        required
      />

      <Input
        type="string"
        name="brand_name"
        label="Brand name"
        disabled={isLoading}
        required
      />
      <Selector
        id="category"
        label="Category"
        name="category_id"
        onChange={selectCategory}
        data={categories}
        disabled={isLoading}
        placeholder="Select a category option"
        required
      />
      <Input
        type="number"
        name="root_price"
        label="Root Price"
        disabled={isLoading}
        required
      />
      <Input
        type="number"
        name="sale_price"
        label="Sale Price"
        disabled={isLoading}
        required
      />
      <Input
        type="number"
        name="discount"
        label="Discount"
        disabled={isLoading}
        required
      />
      <Input
        type="number"
        name="discount_rate"
        label="Discount Rate"
        disabled={isLoading}
        required
      />
      <Input
        type="string"
        name="short_description"
        label="Short Description"
        disabled={isLoading}
        required
      />
      {/*<Input
        type="number"
        name="rating_average"
        label="Rating Average"
        disabled={true}
        required
      />
      <Input
        type="number"
        name="review_count"
        label="Review Count"
        disabled={isLoading}
        required
      /> 
      
      
      <Input
        type="number"
        name="quantity_sold"
        label="Quantity Sold"
        disabled={isLoading}
        required
      />
      */}
      <Input
        type="number"
        name="quantity_in_stock"
        label="Quantity In Stock"
        disabled={isLoading}
        required
      />
      <ThumbnailInput onFinish={thumbnailsOnChanged} />
      <Form.Item name="description" label="Description">
        {textEditor("", 1000)}
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Space>
          <Button
            type="link"
            htmlType="button"
            onClick={() => navigate("/products")}
          >
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
