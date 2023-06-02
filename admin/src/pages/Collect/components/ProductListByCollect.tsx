import React, { useCallback, useState } from "react";
import { Avatar, Divider, List, Space } from "antd";
import { ProductType } from "../../../types";
import { DeleteFilled, StarFilled } from "@ant-design/icons";
import Price from "../../../components/Price";
import { withScrollView } from "../../../hoc";
import clsx from "clsx";

interface Props {
  data: ProductType[];
  filter: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const ProductListByCollect: React.FC<Props> = ({ data, filter }) => {
  const [idSelected, setIdSelected] = useState();

  const showDeleteIcon = (e) => {
    if (e?.target?.id) setIdSelected(e?.target?.id);
  };
  const hiddenDeleteIcon = () => setIdSelected(null);

  const renderItem = (item) => (
    <List.Item className="cursor" onMouseOver={showDeleteIcon} id={item?.id}>
      <List.Item.Meta
        avatar={<Avatar src={item?.thumbnails[0]} />}
        title={<a>{item.title}</a>}
        description={
          <Space>
            <span className="text-italic">Rate: </span>
            <span>
              {item?.rating_average} <StarFilled className="star" />
            </span>
            <Divider type="vertical" />
            <span className="text-italic">Sold: </span>
            <span>{item?.quantity_sold}</span>
            <Divider type="vertical" />
            <Price rootValue={item?.root_price} saleValue={item?.sale_price} />
          </Space>
        }
      />
      <div
        className={clsx(["px-2", item?.id !== idSelected && "hidden"])}
        onClick={() => filter(item?.id)}
      >
        <DeleteFilled style={{ fontSize: 20, color: "red" }} />
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
export default withScrollView(ProductListByCollect);
