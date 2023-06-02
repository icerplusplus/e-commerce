import {Skeleton} from "@/components";
import {useCategory} from "@/hooks";
import React from "react";

interface Props {
  filterByBrands: (brandName: string) => void;
}

const BrandInput: React.FC<Props> = ({filterByBrands}) => {
  const {brands} = useCategory();

  return (
    <Skeleton type="brands-sidebar" isLoading={brands.length === 0}>
      <div className="p-3 rounded-l-sm border-b border-divider">
        <div className="text-[#38383d] text-sm font-bold pb-3">Thương hiệu</div>
        <div className="flex flex-col justify-start">
          {brands.map((brand, idx) => (
            <div
              className="flex flex-row items-center w-full pb-3"
              key={brand.brand_name}
            >
              <input
                type="checkbox"
                value={brand.brand_name}
                className="w-4 h-4"
                onChange={(e) => filterByBrands(e.target.value)}
              />
              <p className="text-xs text-[#38383d] ml-3">{brand.brand_name}</p>
            </div>
          ))}
        </div>
      </div>
    </Skeleton>
  );
};

export default BrandInput;
