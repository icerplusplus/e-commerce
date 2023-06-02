import {selectDataInCart} from '@/stores/reducer';
import {useAppSelector} from './useStore';

export const useCartStore = () => {
  // Store
  const cartStore = useAppSelector((state) => selectDataInCart(state));

  return {cartStore} as const;
};
