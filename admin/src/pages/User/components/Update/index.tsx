import { Button, Form, Space, Switch } from "antd";
import Input from "../../../../components/Input";
import { formItemLayout } from "../../../../libs";
import { updateCategory } from "../../../../api";
import { useCallback, useState, useRef } from "react";
import ThumbnailInput from "../../../../components/ThumbnailInput";
import { useNotification, useUsers } from "../../../../hooks";
import { CategoryProps } from "../../../../types";
import Spiner from "../../../../components/Spiner";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

interface UpdateFormProps {
  onClose: void;
  onLoading: void;
  data: CategoryProps;
}

const Update = ({ data, onClose, onLoading }: UpdateFormProps) => {
  const [form] = Form.useForm();
  const thumbnailRef = useRef(data?.avatar);
  const adminRef = useRef(data?.is_admin || false);

  const { updateUser } = useUsers();

  const onFinish = useCallback(async (values) => {
    values.id = data?.id;
    delete values.thumbnails;
    values.avatar = thumbnailRef.current;
    values.is_admin = adminRef.current;
    onLoading(true);
    await updateUser(values);
    onLoading(false);
    onClose();
  }, []);

  const onThumbnailUploadHandler = useCallback(
    (thumnail) => {
      if (thumnail) thumbnailRef.current = thumnail;
    },
    [thumbnailRef]
  );

  const setAdminRole = (checked) => {
    adminRef.current = checked;
  };

  if (!data) return <Spiner />;

  return (
    <Form
      initialValues={{ ...data }}
      {...formItemLayout}
      form={form}
      name="update"
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
        disabled={true}
      />

      <ThumbnailInput
        onFinish={onThumbnailUploadHandler}
        direction="col"
        witdhFull
        single
        data={[thumbnailRef.current]}
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

export default Update;
