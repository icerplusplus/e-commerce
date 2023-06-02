import React from "react";
import AddressInput from "./components/AddressInput";
import RateInput from "./components/RateInput";
import RangeInput from "./components/RangeInput";
import BrandInput from "./components/BrandInput";
import {withSticky} from "@/hoc";

interface Props {
  filters: any;
  filterByRating: (rate: number) => void;
  filterByPriceRange: (start: number, end: number) => void; // CALLBACK
  filterByBrands: (brand: string) => void; // CALLBACK
}

const FilterSideBar: React.FC<Props> = ({
  filters,
  filterByRating,
  filterByPriceRange,
  filterByBrands,
}) => {
  return (
    <div className="min-w-[200px] max-w-[200px] bg-white">
      <AddressInput />
      <RateInput filterByRating={filterByRating} />
      <RangeInput filters={filters} filterByPriceRange={filterByPriceRange} />
      <BrandInput filterByBrands={filterByBrands} />
    </div>
  );
};

export default withSticky(FilterSideBar);
