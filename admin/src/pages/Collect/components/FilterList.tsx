import { useEffect, useState, useRef } from "react";
import CategoryBadgeList from "./CategoryBadgeList";
import { FilterOutlined } from "@ant-design/icons";
import CategoryProduct from "./CategoryProduct";
import { useCategories } from "../../../hooks";
import { PaginateType, ProductType } from "../../../types";
import { queryProductsByCondition } from "../../../api";
import { Button } from "antd";

const FilterList = () => {
  const { categories } = useCategories();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [paginate, setPaginate] = useState<PaginateType>({
    page: 0,
    size: 32,
  });
  const [isLoading, setIsLoading] = useState(false);
  const idRef = useRef();

  const categoryIdChange = async (id) => {
    idRef.current = id;
    loadmore({ page: 0, size: 32 });
  };

  // loadmore products
  const loadmore = async (paginate) => {
    if (idRef.current) {
      setIsLoading(true);
      // TODO: fetch category data
      const data = await queryProductsByCondition({
        page: paginate.page + 1,
        size: paginate.size,
        category_id: idRef.current,
      });

      setPaginate(data?.data?.pagination);

      setProducts(data?.data?.products);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (categories) categoryIdChange(categories?.data?.categories[0]?.id);
  }, [categories]);

  return (
    <>
      <p>
        Filter by categories <FilterOutlined />
      </p>

      <CategoryBadgeList
        data={categories?.data?.categories}
        onSelect={categoryIdChange}
      />
      <CategoryProduct data={products} />

      {paginate?.amount !== 0 && (
        <div className="flex justify-center py-2">
          <Button
            type="primary"
            loading={isLoading}
            style={{ width: 200 }}
            onClick={() => loadmore(paginate)}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
};

export default FilterList;
