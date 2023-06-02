import { useState, useEffect, useCallback } from "react";
import { queryCategories, queryCategory } from "../api";
import { CategoryProps, PaginateType } from "../types";
import { useLocation } from "react-router-dom";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginate, setPaginate] = useState<PaginateType>({
    page: 1,
    size: 20,
  });
  const [countAll, setCountAll] = useState<number>(0);

  //LOCATION
  const location = useLocation();

  const fetchCategories = useCallback(async () => {
    const data = await queryCategories(paginate);

    if (data) {
      setCategories(data);
      setCountAll(data.data.max_total);
    }
  }, [paginate]);

  const findCategoryById = async (
    id: string | number
  ): Promise<CategoryProps> => {
    const response = await queryCategory(id);
    if (!response?.data) return null;
    return response?.data;
  };

  const pageChangeHandler = useCallback((paginate: PaginateProps): void => {
    setPaginate(paginate);
  }, []);

  const onLoading = useCallback((state: boolean) => setIsLoading(state), []);

  useEffect(() => {
    fetchCategories();
  }, [paginate, isLoading, location]);

  return {
    isLoading,
    categories,
    countAll,
    pageChangeHandler,
    fetchCategories,
    findCategoryById,
    onLoading,
  } as const;
};
