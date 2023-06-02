import { useState, useEffect, useCallback, useRef } from "react";
import {
  deleteProductById,
  queryProduct,
  queryProducts,
  queryProductsByCondition,
  updateProductById,
} from "../api";
import { PaginateType, ProductType } from "../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useNotification } from ".";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productUpdate, setProductUpdate] = useState<ProductType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paginate, setPaginate] = useState<PaginateType>({
    page: 1,
    size: 10,
  });
  const [countAll, setCountAll] = useState<number>(0);

  // GET PARAMS
  const { id } = useParams();

  // NAVIGATION
  const navigate = useNavigate();

  //LOCATION
  const location = useLocation();

  // NOTIFICATION
  const notification = useNotification();

  const fetchProducts = useCallback(async () => {
    const data = await queryProducts(paginate);

    if (data) {
      setProducts(data);
      setCountAll(data.data.max_total);
    }
  }, []);

  const fetchProductById = useCallback(async (id: string | number) => {
    setIsLoading(true);
    const data = await queryProduct(id);
    if (data) setProductUpdate(data?.data);
    setIsLoading(false);
  }, []);

  const fetchProductsByCondition = async (condition) => {
    const data = await queryProductsByCondition(condition);
    setProducts(data);
  };

  const updateProduct = async (product: ProductType) => {
    const data = await updateProductById(product);

    if (data.status === 200) {
      notification.success({
        message: "Update have been completed!",
      });

      navigate("/products");
    } else
      notification.error({
        message: data?.message || "Update failed!",
      });
  };

  const deleteProduct = async (id: string | number) => {
    setIsLoading(true);
    await deleteProductById(id);
    setIsLoading(false);
  };

  const pageChangeHandler = useCallback((paginate: PaginateProps): void => {
    setPaginate(paginate);
  }, []);

  const onLoading = useCallback(
    (state: boolean) => setIsLoading(state),
    [isLoading]
  );

  useEffect(() => {
    fetchProducts();
  }, [paginate, isLoading, location]);

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id]);

  return {
    isLoading,
    products,
    productUpdate,
    countAll,
    pageChangeHandler,
    fetchProducts,
    fetchProductById,
    fetchProductsByCondition,
    updateProduct,
    deleteProduct,
    onLoading,
  } as const;
};
