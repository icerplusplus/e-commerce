import React from "react";
import { IProduct } from "../../types";
import ProductCard from "../ProductCard";
import { Row } from "antd";

interface Props {
  data: IProduct[];
}

const CollectionProducts: React.FC<Props> = ({ data }) => {
  return (
    <div className="list">
      {data?.map((item) => (
        <ProductCard data={item} key={item?.id} />
      ))}
    </div>
  );
};

export default CollectionProducts;
