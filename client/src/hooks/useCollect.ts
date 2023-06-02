import {useEffect} from 'react';
import {collectAsyncThunks, selectCollects} from '@/stores/reducer';
import {useAppDispatch, useAppSelector} from './useStore';
import {IPaginate} from '@/types';

export const useCollect = () => {
  const collects = useAppSelector(selectCollects);
  const dispatch = useAppDispatch();

  // TODO: fetch category list data

  useEffect(() => {
    const fetchInitial = async (paginate: IPaginate) =>
      paginate &&
      collects.data?.length === 0 &&
      (await dispatch(
        collectAsyncThunks.queryCollects({
          ...paginate,
          page: Number(paginate?.page) + 1,
          size: paginate?.size,
        }),
      ));

    // @ts-ignore
    fetchInitial(collects?.paginate);
  }, []);

  return [collects] as const;
};
