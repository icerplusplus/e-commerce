import { Button, Form } from "antd";
import Input from "../../../../components/Input";
import { formItemLayout } from "../../../../libs";
import { updateCategory } from "../../../../api";
import { useCallback, useState, useRef } from "react";
import ThumbnailInput from "../../../../components/ThumbnailInput";
import { useNotification } from "../../../../hooks";
import { CategoryProps } from "../../../../types";
import Spiner from "../../../../components/Spiner";

interface UpdateFormProps {
  onClose: void;
  onLoading: void;
  data: CategoryProps;
}

const Update = ({ data, onClose, onLoading }: UpdateFormProps) => {
  const [form] = Form.useForm();
  const thumbnailRef = useRef(data?.thumbnail || "");

  const notification = useNotification();

  const onFinish = useCallback(async (values) => {
    values.id = data?.id;
    delete values.thumbnails;
    values.thumbnail = thumbnailRef.current;
    onLoading(true);

    try {
      const response = await updateCategory(values);
      if (response.status === 200) {
        window.scrollTo(0, 0);
        notification.success({
          message: "Category have been updated!",
        });
        onLoading(false);
      } else {
        notification.error({
          message: response?.message || "Updated failed!",
        });
        onLoading(false);
      }
      onClose();
    } catch (error) {
      notification.error({
        message: response?.message || "Updated failed!",
      });
    }
  }, []);

  const onThumbnailUploadHandler = useCallback(
    (thumnail) => {
      thumbnailRef.current = thumnail ? thumnail : "";
    },
    [thumbnailRef]
  );

  if (!data) return <Spiner />;

  return (
    <Form
      initialValues={{ ...data }}
      {...formItemLayout}
      form={form}
      name="categorires"
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
        data={[data?.thumbnail]}
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

export default Update;
