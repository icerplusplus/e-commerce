import { Button, Form, Space, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Input from "../../../../components/Input";
import { formItemLayout } from "../../../../libs";
import { addCategory } from "../../../../api";
import { useCallback, useState, useRef, useEffect } from "react";
import ThumbnailInput from "../../../../components/ThumbnailInput";
import { useNotification, useUsers } from "../../../../hooks";

import "./index.css";

interface CreateFormProps {
  onClose: void;
  onLoading: void;
}

const Create = ({ onClose, onLoading }: CreateFormProps) => {
  const [form] = Form.useForm();

  const thumbnailRef = useRef("");
  const adminRef = useRef(false);

  const { createUser } = useUsers();

  const onFinish = useCallback(async (values) => {
    const { thumbnails, ...orders } = values;
    orders.avatar = thumbnailRef.current;
    orders.is_admin = adminRef.current;

    await createUser(orders);
    onClose();
  }, []);

  const setAdminRole = (checked) => {
    adminRef.current = checked;
  };

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
      name="create"
      onFinish={onFinish}
      style={{ width: "100%", alignItems: "center" }}
      scrollToFirstError
    >
      <Input
        type="email"
        name="email"
        label="Email"
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

      <Space style={{ paddingBottom: "1rem" }}>
        <span>Is Admin:</span>
        <Switch
          onChange={setAdminRole}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={adminRef.current}
        />
      </Space>

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
