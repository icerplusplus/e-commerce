import {useEffect, useMemo, useState} from "react";
import {categoryAsyncThunks, selectCategories} from "@/stores/reducer";
import {useAppDispatch, useAppSelector} from "./useStore";
import {ProductsFilterType, IPaginate, IProduct} from "@/types";
import {useParams} from "react-router-dom";
import {categoryApi} from "@/api";
import {Unique} from "@/utils/helpers";
import {filterItems} from "@/utils/libs";
import {usePagination} from "./usePagination";

export const useCategory = () => {
  // use params hook from react router dom
  const {id} = useParams();

  const [productsDependOnCategoryId, setProductsDependOnCategoryId] = useState<
    IProduct[]
  >([]);

  // state
  const {pagination, onPaginationChange, renderPagination} = usePagination();

  const [filters, setFilters] = useState<ProductsFilterType>({
    // pagination
    _page: pagination.page,
    _size: pagination.size,
    // condition
    _filterBy: filterItems[0].value,
    _rating: -1,
    _priceRangeStart: 0,
    _priceRangeEnd: 0,
    _brands: [],
    _category_id: id,
  });

  const [brands, setBrands] = useState<{brand_name: string}[]>([]);

  // store
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  // TODO: check category id have been already exists in database
  // ...

  // Get products data depend on category id
  const fetchs = {
    fetchProductsByCategory: async (
      categoryId: string | number,
      paginate: IPaginate,
    ) => {
      await categoryApi
        .getProductsByCategoryId(categoryId, paginate)
        .then(({data}) => {
          // Update page number
          onPaginationChange({
            ...data.pagination,
            total: data.max_total,
          });
          // update products list
          setProductsDependOnCategoryId(data.products);
        })
        .catch((error) => console.log(error));
    },

    fetchBrandsByCategory: async (categoryId: string) => {
      await categoryApi
        .getBrandsByCategoryId(categoryId)
        .then(({data}) => {
          const brands = Unique.arrayHandler.uniqueArray(
            data.items,
            "brand_name",
          );
          console.log("brands: ", brands);
          setBrands(brands);
        })
        .catch((error) => console.log(error));
    },
    fetchProductsByFilterCondition: async (condition: any) => {
      await categoryApi
        .filterProducts(condition)
        .then(({data}) => {
          // Update page number
          onPaginationChange({
            ...data.pagination,
            total: data.max_total,
          });
          // update products list
          setProductsDependOnCategoryId(data.products);
        })
        .catch((error) => console.log(error));
    },
  };

  // Filter actions
  const filterActions = useMemo(() => {
    return {
      filterByRating: async (value: number) => {
        setFilters({
          ...filters,
          _rating: value,
        });
        onPaginationChange({...pagination, page: 1});
      },

      filterByPriceRange: (startRange: number, endRange: number) => {
        setFilters({
          ...filters,
          _priceRangeStart: startRange,
          _priceRangeEnd: endRange,
        });
        onPaginationChange({...pagination, page: 1});
      },

      filterByBrands: (brandName: string) => {
        setFilters({
          ...filters,
          _brands: !filters._brands.includes(brandName)
            ? [...filters._brands, brandName]
            : [...filters._brands].filter((brand) => brand !== brandName),
        });
        onPaginationChange({...pagination, page: 1});
      },
      filterByKeyType: (key: string) => {
        // set filters data
        if (key !== "ALL")
          setFilters({
            ...filters,
            _filterBy: key,
          });
        else
          setFilters({
            ...filters,
            _page: 1,
            _filterBy: filterItems[0].value,
            _rating: -1,
            _priceRangeStart: 0,
            _priceRangeEnd: 0,
          });
        onPaginationChange({...pagination, page: 1});
      },
    };
  }, [filters]);

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
      fetchs.fetchBrandsByCategory(id);
    }
  }, [id]);

  // TODO: call to server to get new data
  useEffect(() => {
    if (id) {
      console.table(filters);
      fetchs.fetchProductsByFilterCondition(filters);
    }
  }, [filters]);

  useEffect(() => {
    // set page and size in filters state
    if (id) {
      setFilters((filters) => ({
        ...filters,
        _page: pagination.page,
        _size: pagination.size,
      }));
    }
  }, [pagination.page, pagination.size]);

  // TODO: fetch category list data
  useEffect(() => {
    const fetchInitial = async (paginate: IPaginate) => {
      if (paginate && categories.data?.length === 0)
        await dispatch(
          categoryAsyncThunks.queryCategories({
            ...paginate,
            page: Number(paginate?.page) + 1,
            size: paginate?.size,
          }),
        );
    };

    /* @ts-ignore */
    fetchInitial(categories?.paginate);
  }, []);

  // Fetch product list depend on category id when client go to Category page

  return {
    categories,
    products: productsDependOnCategoryId,
    brands,
    filtersData: filters,
    filterActions,
    renderPaginationComponent: renderPagination,
  } as const;
};
