import {
  CaretDownOutlined,
  DeleteOutlined,
  DeleteRowOutlined,
  DownOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  App,
  Badge,
  Button,
  Dropdown,
  Image,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import React, { useEffect, useRef, useState } from "react";

import currencyFormatter from "currency-formatter";
import "./index.css";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import { fallback } from "../../libs";

interface TableProps {
  data: unknown;
  tableName?: string;
  onCreate?: void;
  onUpdate?: void;
  onDelete?: void;
  onPageChange?: void;
  onRowUpdate?: void;
  onRowDelete?: void;
}

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];

const halveFieldData = (data) => {
  // Filter array/object value
  const basicData = [],
    hiddenData = [],
    basicKeys = [],
    hiddenKeys = [];
  if (Array.isArray(data)) {
    // filter data
    data.forEach((item) => {
      const newBasicObj = {};
      const newHiddenObj = {};
      Object.keys(item).forEach((key) => {
        if (
          key === "thumbnails" ||
          key === "thumbnail" ||
          key === "avatar" ||
          (!Array.isArray(item[key]) &&
            key !== "short_description" &&
            key !== "description" &&
            key !== "createdAt" &&
            key !== "updatedAt")
        ) {
          if (typeof item[key] === "object" && !Array.isArray(item[key])) {
            Object.defineProperty(newBasicObj, key, {
              value: item[key]?.title,
              writable: false,
            });
          } else {
            Object.defineProperty(newBasicObj, key, {
              value: item[key],
              writable: false,
            });
          }
        } else {
          Object.defineProperty(newHiddenObj, key, {
            value: item[key],
            writable: false,
          });
        }
      });
      basicData.push(newBasicObj);
      hiddenData.push({ data: [newHiddenObj], id: item["id"] });
    });

    // filter keys
    Object.keys(data[0]).forEach((key) => {
      if (
        key === "thumbnails" ||
        key === "thumbnail" ||
        key === "avatar" ||
        (!Array.isArray(data[0][key]) &&
          key !== "short_description" &&
          key !== "description" &&
          key !== "createdAt" &&
          key !== "updatedAt")
      )
        basicKeys.push(key);
      else hiddenKeys.push(key);
    });
  }

  return {
    fieldsShow: basicKeys,
    fieldsHidden: hiddenKeys,
    dataShow: basicData,
    dataHidden: hiddenData,
  };
};

const getColumns = (columns: TableColumnsType) => {
  return columns?.map((item) => ({
    title: item
      .replace(item.charAt(0), item.charAt(0).toUpperCase())
      .replaceAll("_", " "),
    dataIndex: item,
    key: item,
  }));
};

const Tables: React.FC<TableProps> = ({
  data,
  tableName,
  onCreate,
  onUpdate,
  onDelete,
  onPageChange,
  onRowUpdate,
  onRowDelete,
}) => {
  const [expandedRowIdSeleted, setExpandedRowIdSeleted] = useState();
  const [modalContent, setModalContent] = useState();
  const hiddenExpeadedTableRef = useRef();

  const navigate = useNavigate();

  if (data?.data[tableName].length === 0)
    return (
      <Table
        columns={[1, 2, 3, 4, 5].map((item) => ({
          title: `Column ${item}`,
          dataIndex: item,
          key: item,
        }))}
        dataSource={[]}
        pagination={false}
        size="small"
      />
    );

  const { fieldsHidden, fieldsShow, dataShow, dataHidden } = halveFieldData(
    data?.data[tableName]
  );

  const renderRowData = (data: unknown, fields: string[]) => {
    return data?.map((row) => {
      const newObj = {};
      fields.forEach((field) => {
        const isMoneyType =
          field.match(/pr..e/g) !== null || field === "discount";
        const isImageType =
          field === "thumbnails" || field === "thumbnail" || field === "avatar";
        const imgUrl = field === "thumbnails" ? row[field][0] : row[field];
        const isDateTimeType =
          field.match(/time/g) !== null ||
          field.match(/create/g) !== null ||
          field.match(/update/g) !== null;
        const isJsonType =
          Array.isArray(row[field]) && typeof row[field][0] === "object";
        const isBooleanType = typeof row[field] === "boolean";
        Object.defineProperty(newObj, field, {
          value: isBooleanType ? (
            <Tag color={row[field] ? "cyan" : "red"}>
              {row[field].toString()}
            </Tag>
          ) : isImageType ? (
            imgUrl === "" ? (
              <Image width={100} height={100} src="error" fallback={fallback} />
            ) : (
              <Image fallback={imgUrl} src={imgUrl} width={100} height={100} />
            )
          ) : isJsonType ? (
            <Tag
              color="error"
              className="cursor"
              onClick={() => {
                showContent(field);
              }}
            >
              <Space>
                <EyeOutlined />
                Show
              </Space>
            </Tag>
          ) : row[field].toString().length > 400 ? (
            <Tag
              color="cyan"
              className="cursor"
              onClick={() => {
                showContent(field);
              }}
            >
              <Space>
                <EyeOutlined />
                Show
              </Space>
            </Tag>
          ) : isMoneyType ? (
            currencyFormatter.format(row[field], { locale: "vn-VN" })
          ) : isDateTimeType ? (
            new Date(row[field]).toLocaleString("vn-VN", {
              localeMatcher: "best fit",
              timeZoneName: "short",
            })
          ) : (
            row[field]
          ),
        });

        newObj["actions"] = (
          <Space size="middle">
            <Dropdown
              menu={{
                items: [
                  {
                    key: "delete",
                    label: "Delete",
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: () =>
                      onDelete ? onDelete(row["id"]) : onRowDelete(row["id"]),
                  },
                  {
                    key: "update",
                    label: "Update",
                    icon: <EditOutlined />,
                    onClick: () =>
                      onUpdate ? onUpdate(row["id"]) : onRowUpdate(row["id"]),
                  },
                ],
              }}
            >
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        );
      });
      return newObj;
    });
  };

  const expandedInfinityRowHandler = (data, fields) => {
    return () => (
      <Table
        columns={getColumns(fields)}
        dataSource={renderRowData(data, fields)}
        rowKey={(record, index) => index}
        pagination={false}
      />
    );
  };

  const findIndex = dataHidden.findIndex(
    (item) => item?.id === expandedRowIdSeleted
  );

  const expandedRowRender = expandedInfinityRowHandler(
    dataHidden[findIndex > -1 ? findIndex : 0].data,
    fieldsHidden
  );

  const renderHiddenTableOnModal = (data) => {
    const { fieldsShow, dataShow } = halveFieldData(data);

    return (
      <Table
        columns={getColumns(fieldsShow)}
        dataSource={dataShow || []}
        pagination={false}
        rowKey={(record, index) => index}
        size="small"
      />
    );
  };

  const showContent = (field) => {
    const content = dataHidden[findIndex > -1 ? findIndex : 0].data[0][field];
    setModalContent(
      typeof content === "string" ? (
        <div
          className="widthmore"
          dangerouslySetInnerHTML={{
            __html: dataHidden[findIndex > -1 ? findIndex : 0].data[0][field],
          }}
        />
      ) : (
        renderHiddenTableOnModal(content)
      )
    );
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    try {
      const expandedDom = document.querySelectorAll(
        ".ant-table-expanded-row-level-1"
      );

      if (expandedDom.length > 0) {
        const idx = expandedDom.length - 1;
        const item = expandedDom[idx];
        const currentAttrs = item.getAttributeNames();

        // remove style attribute
        for (const attr of currentAttrs) {
          const value = item.getAttribute(attr);
          if (attr === "style" && value === "display: none;") {
            const attrTmp = item.getAttributeNode("style");
            item.removeAttributeNode(attrTmp);
          }
        }

        if (expandedDom.length > 1) {
          const newNodeList = Array.prototype.slice
            .call(expandedDom)
            .filter((node, index) => index !== idx);

          // check exist style attribute
          for (const node of newNodeList) {
            const styleAttr = node.getAttributeNode("style");
            // const value = node.getAttribute(styleAttr);

            if (!styleAttr) {
              // reinstall style attribute
              const attrTmp = document.createAttribute("style");
              attrTmp.value = "display: none;";
              node.setAttributeNode(attrTmp);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [expandedRowIdSeleted]);

  return (
    <>
      <Modal
        title={dataShow[findIndex > -1 ? findIndex : 0].title}
        content={modalContent}
        isOpen={modalContent}
      />
      {/* header actions */}

      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space direction="horizontal" size="small">
          <Button
            type="primary"
            onClick={() => {
              if (onCreate) {
                onCreate();
              } else navigate("create");
            }}
          >
            Create
          </Button>
          <Button type="dashed" danger icon={<CaretDownOutlined />}>
            Exports
          </Button>
        </Space>
        <Table
          columns={getColumns(
            fieldsShow.filter((field) => field !== "id")
          ).concat({
            title: "Actions",
            key: "actions",
            dataIndex: "actions",
          })}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          dataSource={renderRowData(dataShow, fieldsShow)}
          size="small"
          rowKey={(record) => record?.id}
          onExpand={(e, r) => setExpandedRowIdSeleted(r?.id)}
          ref={hiddenExpeadedTableRef}
          pagination={{
            pageSizeOptions: [10, 20, 30, 50, 100],
            showSizeChanger: true,
            total: data.data.max_total,
            onChange: (page, pageSize) =>
              onPageChange({ page, size: pageSize }),
            defaultPageSize: data.data.pagination.size,
            defaultCurrent: data.data.pagination.page,
          }}
        />
      </Space>
    </>
  );
};

export default Tables;
