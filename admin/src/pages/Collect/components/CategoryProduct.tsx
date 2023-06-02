import { Empty } from "antd";
import { ProductType } from "../../../types";
import ProductCard from "./ProductCard";

interface Props {
  data: ProductType[];
}

const CategoryProduct: React.FC<Props> = ({ data }) => {
  if (data.length === 0) <Empty />;
  return (
    <div className="list">
      {data?.map((item) => (
        <ProductCard data={item} key={item?.id} />
      ))}
    </div>
  );
};

export default CategoryProduct;
