import React from "react";
import {List, ProductCard, Skeleton} from "@/components";
import {IProduct} from "@/types";
import {Segmented} from "antd";
import {filterItems} from "@/utils/libs";

interface Props {
  data: IProduct[];
  filterByKeyType: (value: string) => void;
  renderPagination: () => any;
}

const Products: React.FC<Props> = ({
  data,
  renderPagination,
  filterByKeyType,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-2">
      {/* filters topbar  */}
      <Skeleton type="top-sidebar" isLoading={data.length === 0}>
        <div className="bg-white py-2 text-white">
          <Segmented
            size="large"
            options={filterItems}
            onChange={(value) => filterByKeyType(value.toString())}
          />
        </div>
      </Skeleton>
      {/* products list after filter */}

      <Skeleton type="product-card" isLoading={data.length === 0} quantity={40}>
        <List>
          {data.length !== 0 &&
            data?.map((product) => (
              <ProductCard data={product} key={product.id} />
            ))}
        </List>
      </Skeleton>

      {/* pagination */}
      {renderPagination()}
    </div>
  );
};

export default Products;
