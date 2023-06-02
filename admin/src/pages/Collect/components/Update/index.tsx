import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { CollectType, UpdateFormProps } from "../../../../types";
import { Form } from "antd";
import { useNotification } from "../../../../hooks";
import { formItemLayout, formStyle } from "../../../../libs";
import Input from "../../../../components/Input";
import ThumbnailInput from "../../../../components/ThumbnailInput";
import Button from "../../../../components/Button";
import { queryCollect, updateCollect } from "../../../../api";
import Spiner from "../../../../components/Spiner";

const Update = ({ onClose, onLoading, callback, id }: UpdateFormProps) => {
  const [form] = Form.useForm();

  const [collect, setCollect] = useState<CollectType>();

  const formId = useId();

  const thumbnailRef = useRef("");

  const notification = useNotification();

  const onFinish = useCallback(async (values) => {
    values.id = id;
    delete values.thumbnails;
    values.thumbnail = thumbnailRef.current;
    // if (values?.products?.length === 0) values.products = [];

    const response = await updateCollect(values);
    if (response.status === 200) {
      form.resetFields();
      window.scrollTo(0, 0);
      notification.success({
        message: "Collect have been updated!",
      });

      await callback();
      onClose();
    } else {
      notification.error({
        message: response?.message || "Update failed!",
      });
    }
  }, []);

  const onThumbnailUploadHandler = useCallback(
    (thumnail) => {
      thumbnailRef.current = thumnail ? thumnail : collect?.thumbnail;
    },
    [thumbnailRef]
  );

  useEffect(() => {
    // get initial collect data
    const getInitialCollectData = async (id: string | number) => {
      const res = await queryCollect(id);
      setCollect(res?.data);
      thumbnailRef.current = res?.data?.thumbnail;
    };
    getInitialCollectData(id);
    return () => form.resetFields();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!collect || !id) return <Spiner />;

  return (
    <Form
      {...formItemLayout}
      initialValues={{ ...collect }}
      form={form}
      id={formId}
      name="collect-update-form"
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
        data={collect?.thumbnail?.length === 0 ? [] : [collect?.thumbnail]}
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

export default Update;
