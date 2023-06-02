import React from "react";
import {withHeaderAndFooter} from "@/hoc";
import {Container, Skeleton} from "@/components";
import {useCategory} from "@/hooks";

import FilterSideBar from "./components/FilterSideBar";
import Products from "./components/Products";

const Category: React.FC = () => {
  // use hook custom to get the category data
  const {products, filtersData, filterActions, renderPaginationComponent} =
    useCategory();

  return (
    <Container className="flex flex-row space-y-0">
      <Skeleton type="left-sidebar" isLoading={products.length === 0}>
        <FilterSideBar
          filters={filtersData}
          filterByRating={filterActions.filterByRating}
          filterByPriceRange={filterActions.filterByPriceRange}
          filterByBrands={filterActions.filterByBrands}
        />
      </Skeleton>

      <Products
        data={products}
        filterByKeyType={filterActions.filterByKeyType}
        renderPagination={renderPaginationComponent}
      />
    </Container>
  );
};

export default withHeaderAndFooter(Category);
// p-0
// my-0
// space-y-0
