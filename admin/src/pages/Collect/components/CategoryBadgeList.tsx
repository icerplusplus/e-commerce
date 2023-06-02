import React, { useState } from "react";
import { Avatar, Row, Space } from "antd";
import Spiner from "../../../components/Spiner";
import { CategoryType } from "../../../types";
import clsx from "clsx";

interface Props {
  data: CategoryType[];
  onSelect: () => void;
}

const CategoryBadgeList: React.FC<Props> = ({ data, onSelect }) => {
  const [categoryIdSelected, setCategoryIdSelected] = useState();

  const selectId = (id) => {
    setCategoryIdSelected(id);
    onSelect(id);
  };

  if (!data) return <Spiner />;
  return (
    <Row className="py-2">
      <Space size="middle">
        {data?.map((item: CategoryType, index) => (
          <Avatar
            size={38}
            src={item?.thumbnail || item?.avatar}
            key={item?.id}
            alt={item?.title}
            onClick={() => selectId(item?.id)}
            className={clsx([
              (item?.id === categoryIdSelected ||
                (!categoryIdSelected && index === 0)) &&
                "border-active",
            ])}
          />
        ))}
      </Space>
    </Row>
  );
};

export default CategoryBadgeList;
