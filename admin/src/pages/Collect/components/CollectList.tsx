import React, { useState } from "react";
import { Avatar, List } from "antd";
import { CollectType } from "../../../types";
import clsx from "clsx";
import { withScrollView } from "../../../hoc";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { deleteCollect, queryCollect } from "../../../api";
import { useModal, useNotification } from "../../../hooks";
import { Colors } from "../../../libs";

interface Props {
  data?: CollectType[];
  onFocus?: () => void;
  actions?: {
    create?: void | Promise<void>;
    update?: (id: string | number) => Promise<void>;
    delete?: (id: string | number) => Promise<void>;
    refresh?: (id: string | number) => Promise<void>;
  };
}

// eslint-disable-next-line react-refresh/only-export-components
const CollectList: React.FC<Props> = ({ data, onFocus, actions }) => {
  const [idSelected, setIdSelected] = useState(data[0]?.id || []);
  const [idHoverSelected, setIdHoverSelected] = useState();

  const showDeleteIcon = (e) => {
    if (e?.target?.id) setIdHoverSelected(e?.target?.id);
  };
  const hiddenDeleteIcon = () => setIdHoverSelected(null);

  const handleSetIdSelected = (id: string | number) => {
    setIdSelected(id);
    onFocus(id);
  };

  const renderItem = (item) => (
    <List.Item
      className={clsx([
        "cursor relative",
        idSelected === item?.id && "bg-active",
      ])}
      onClick={() => handleSetIdSelected(item?.id)}
      onMouseOver={showDeleteIcon}
      id={item?.id}
    >
      <List.Item.Meta
        avatar={<Avatar src={item?.thumbnail} />}
        title={<a>{item.title}</a>}
        description={`Id: ${item?.id}`}
      />
      <div
        className={clsx([
          "px-2 right-0 absolute space-x-4",
          item?.id !== idHoverSelected && "hidden",
        ])}
      >
        <EditFilled
          style={{ fontSize: 20, color: Colors.blue }}
          onClick={() => actions?.update(item?.id)}
        />
        <DeleteFilled
          style={{ fontSize: 20, color: Colors.primary }}
          onClick={() => actions?.delete(item?.id)}
        />
      </div>
    </List.Item>
  );

  return (
    <div onMouseLeave={hiddenDeleteIcon}>
      <List itemLayout="horizontal" dataSource={data} renderItem={renderItem} />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default withScrollView(CollectList);
