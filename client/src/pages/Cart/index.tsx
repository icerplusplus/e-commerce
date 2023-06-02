import React from 'react';
import {useCartStore} from '../../hooks';
import {withHeaderAndFooter} from '../../hoc';
import Container from '../../components/Container';
import {CartEmpty} from './components';
import CartTable from './components/CartTable';

const Cart: React.FC = () => {
  const {cartStore} = useCartStore();

  if (cartStore?.products?.length === 0) return <CartEmpty />;
  return (
    <Container className="md:min-h-[55%]">
      <CartTable data={cartStore} />
    </Container>
  );
};

export default withHeaderAndFooter(Cart);
