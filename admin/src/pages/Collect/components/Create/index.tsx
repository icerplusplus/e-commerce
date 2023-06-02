import React, { useCallback, useEffect, useId, useRef } from "react";
import { CreateFormProps } from "../../../../types";
import { Form } from "antd";
import { useNotification } from "../../../../hooks";
import { fallback, formItemLayout, formStyle } from "../../../../libs";
import Input from "../../../../components/Input";
import ThumbnailInput from "../../../../components/ThumbnailInput";
import Button from "../../../../components/Button";
import { createCollect } from "../../../../api";

const Create = ({ onClose, onLoading, callback }: CreateFormProps) => {
  const [form] = Form.useForm();

  const formId = useId();

  const thumbnailRef = useRef("");

  const notification = useNotification();

  const onFinish = useCallback(async (values) => {
    delete values.thumbnails;
    values.thumbnail = thumbnailRef.current;
    values.products = [];
    onLoading(true);

    const response = await createCollect(values);
    if (response.status === 200) {
      form.resetFields();
      window.scrollTo(0, 0);
      notification.success({
        message: "Collect have been created!",
      });
      onLoading(false);
      await callback();
      onClose();
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
      id={formId}
      name="collect"
      onFinish={onFinish}
      style={formStyle}
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

      <div className="space-x-2">
        <Button type="blue" onClick={onClose}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default Create;
