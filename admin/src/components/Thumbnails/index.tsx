import React, { useState, useEffect, useRef } from "react";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { useUploadFile } from "../../hooks";
import { arrayHandler } from "../../libs";
import { queryProduct } from "../../api";

import { v4 } from "uuid";
import Spiner from "../Spiner";

const { Dragger } = Upload;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Thumbnails: React.FC = ({ productId, setThumbResponse }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [thumbnails, setThumbnails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const uploadThumbnails = async ({ onSuccess, onError }) => {
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

      setThumbnails((prev) => prev.concat(fileList));
      setThumbResponse(
        thumbnails
          .map((thumb) => thumb.url)
          .concat(fileList.map((file) => file.url))
      );
    } else onError("error");
  };

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

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const data = await queryProduct(productId);

      if (data)
        setThumbnails(
          data.data.thumbnails.map((thumb, idx) => ({
            uid: v4(),
            name: v4(),
            status: "done",
            url: thumb,
          }))
        );
      setThumbResponse(data.data.thumbnails);
      setIsLoading(false);
    };
    fetchProduct();
  }, []);

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
    const newThumbnails = files.map((file) => file?.url);

    setThumbnails(files);
    setThumbResponse(newThumbnails);
  };

  if (isLoading) <Spiner />;

  return (
    <>
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
    </>
  );
};

export default Thumbnails;
