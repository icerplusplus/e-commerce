import React from "react";
import {withHeaderAndFooter} from "../../hoc";
import {useProduct} from "../../hooks";
import Container from "../../components/Container";
import NotFound from "../../components/NotFound";
import {ProductMain, Information, Description} from "./components";

const Detail: React.FC = () => {
  const {productSelected} = useProduct();

  if (!productSelected) return <NotFound />;

  console.log("productSelected: ", productSelected);
  return (
    <Container>
      <ProductMain data={productSelected} />
      <Information data={productSelected?.information} />
      <Description data={productSelected?.description} />
    </Container>
  );
};

export default withHeaderAndFooter(Detail);
