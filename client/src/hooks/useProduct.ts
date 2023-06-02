import {useEffect} from 'react';
import {productAsyncThunk, selectProducts} from '@/stores/reducer';
import {useAppDispatch, useAppSelector} from './useStore';
import {useParams} from 'react-router-dom';

export const useProduct = () => {
  const products = useAppSelector((state) => selectProducts(state));
  const dispatch = useAppDispatch();

  // Get params data from url
  const params = useParams();

  // TODO: fetch category list data
  useEffect(() => {
    const fetchInitial = async (id: string) => {
      if (id) await dispatch(productAsyncThunk.getProductById(id));
    };

    /*  @ts-ignore */
    fetchInitial(params.id);
  }, []);

  return {
    productSelected: products?.data?.productDetail,
  } as const;
};
