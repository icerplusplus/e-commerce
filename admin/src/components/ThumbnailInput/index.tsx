import React, { useState, useEffect, useRef, useCallback } from "react";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Modal, Upload, message } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { useUploadFile } from "../../hooks";
import { arrayHandler, getBase64 } from "../../libs";
import Spiner from "../Spiner";

interface Props {
  onFinish: () => void;
  direction?: "col" | "row";
  witdhFull?: boolean | true;
  single?: boolean | true;
  data?: string[];
}

const renderItem = (data) =>
  data.map((item, idx) => ({
    uid: idx,
    name: `Image ${idx}`,
    status: "done",
    url: item,
  }));

const ThumbnailInput: React.FC<Props> = ({
  onFinish,
  direction,
  witdhFull,
  single,
  data,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [thumbnails, setThumbnails] = useState(
    data?.length > 0 ? renderItem(data) : []
  );

  const { Dragger } = Upload;

  const fileListRef = useRef([]);

  // HOOK UPLOAD FILE
  const uploader = useUploadFile();

  // UPLOAD THUMBNAILS
  const beforeUpload = (file, FileList, onError) => {
    const acceptTypes = ["image/png", "image/jpeg", "image/jpg"];

    const files = FileList?.map((file) => {
      if (!acceptTypes.includes(file.type)) {
        message.error("You can only upload JPG/JPEG/PNG file!");
        onError("error");
      } else return file;
    });

    if (files.length > 0) {
      fileListRef.current = fileListRef.current.concat(files);
    } else {
      message.error("No file upload!");
    }
  };

  const uploadThumbnails = useCallback(async ({ onSuccess, onError }) => {
    const files = arrayHandler.uniqueArray(fileListRef.current, "name");

    const images = (await uploader.multiUploadAsync(files, "image")) || [];
    if (images.length > 0) {
      onSuccess("ok");

      const fileList = images.map((thumb, idx) => ({
        uid: idx,
        name: "Image " + idx,
        status: "done",
        url: thumb,
      }));

      if (single) {
        setThumbnails([fileList[fileList.length - 1]]);
        onFinish(fileList[fileList.length - 1]?.url);
      } else {
        setThumbnails((prev) => prev.concat(fileList));
        const newThumbs = arrayHandler
          .uniqueArray(thumbnails, "name")
          .map((thumb) => thumb.url)
          .concat(fileList.map((file) => file.url));

        onFinish(newThumbs);
      }
    } else onError("error");
  }, []);

  const draggerProps: UploadProps = {
    name: "file",
    multiple: true,
    accept: "image/*",
    customRequest: uploadThumbnails,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload: beforeUpload,
  };
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: files }) => {
    if (single) {
      setThumbnails(files);
      onFinish(files[files.length - 1]?.url);
    } else {
      setThumbnails(files);
      const newThumbnails = files.map((file) => file?.url);
      onFinish(newThumbnails);
    }
  };

  useEffect(
    () =>
      function () {
        setPreviewImage("");
        setPreviewTitle("");
        setThumbnails([]);
      },
    []
  );

  return (
    <>
      <div>{direction && direction === "col" && <label>Thumbnails</label>}</div>
      <Form.Item
        wrapperCol={witdhFull && { xs: "100%", sm: "100%" }}
        name="thumbnails"
        label={direction && direction === "col" ? "" : "Thumbnails"}
      >
        <Upload
          listType="picture-card"
          fileList={arrayHandler.uniqueArray(thumbnails, "name")}
          onPreview={handlePreview}
          onChange={handleChange}
        />
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>

        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form.Item>
    </>
  );
};

export default ThumbnailInput;
