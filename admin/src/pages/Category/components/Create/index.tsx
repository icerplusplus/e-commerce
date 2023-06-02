import { Button, Form } from "antd";
import Input from "../../../../components/Input";
import { formItemLayout } from "../../../../libs";
import { addCategory } from "../../../../api";
import { useCallback, useRef, useEffect } from "react";
import ThumbnailInput from "../../../../components/ThumbnailInput";
import { useNotification } from "../../../../hooks";
import { CreateFormProps } from "../../../../types";

import "./index.css";

const Create = ({ onClose, onLoading }: CreateFormProps) => {
  const [form] = Form.useForm();

  const thumbnailRef = useRef("");

  const notification = useNotification();

  const onFinish = useCallback(async (values) => {
    delete values.thumbnails;
    values.thumbnail = thumbnailRef.current;
    onLoading(true);

    const response = await addCategory(values);
    if (response.status === 200) {
      form.resetFields();
      window.scrollTo(0, 0);
      notification.success({
        message: "Category have been created!",
      });
      onLoading(false);
    } else {
      notification.error({
        message: response?.message || "Create failed!",
      });
      onLoading(false);
    }
  }, []);

  const onThumbnailUploadHandler = useCallback(
    (thumnail) => {
      thumbnailRef.current = thumnail ? thumnail : "";
    },
    [thumbnailRef]
  );

  useEffect(() => form.resetFields(), []);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="category"
      onFinish={onFinish}
      style={{ width: "100%", alignItems: "center" }}
      scrollToFirstError
    >
      <Input
        type="string"
        name="title"
        label="Title"
        direction="col"
        required
        witdhFull
      />
      <ThumbnailInput
        onFinish={onThumbnailUploadHandler}
        direction="col"
        witdhFull
        single
      />
      <Form.Item colon={false}>
        <Button
          style={{
            marginRight: 8,
          }}
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Create;
