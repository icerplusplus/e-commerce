import React from "react";
import {Section, Skeleton} from "@/components";
import {useCategory} from "@/hooks";
import {Row} from "antd";
import {ICategory} from "@/types";
import CategoryCard from "./components/CategoryCard";

const Category: React.FC = () => {
  const {categories} = useCategory();
  return (
    <Skeleton type="home-category" isLoading={categories.isLoading}>
      <Section>
        <h1 className="header text-slate-800 pb-4">Danh mục sản phẩm</h1>
        <Row gutter={[16, 16]}>
          {categories?.data?.map((item: ICategory) => (
            <CategoryCard {...item} key={item?.id} />
          ))}
        </Row>
      </Section>
    </Skeleton>
  );
};

export default Category;
