import React from "react";
import {Col} from "antd";
import {ICategory} from "@/types";
import {useAppNavigate} from "@/hooks";

import "./index.css";

const CategoryCard: React.FC<ICategory> = ({id, thumbnail, title}) => {
  const {changeToPage} = useAppNavigate();
  return (
    <Col span={3} onClick={() => changeToPage(`category/${id}`)}>
      <div
        className="
        cate
        flex 
        flex-col
        justify-center
        items-center
        space-y-2
        cursor-pointer
      "
      >
        <img src={thumbnail} alt={title} className="cate__thumb" />
        <span className="text-center px-2">{title}</span>
      </div>
    </Col>
  );
};

export default CategoryCard;
